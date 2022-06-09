import "antd/dist/antd.css";
import "./User.css";
import { useNavigate } from "react-router-dom";
import { Button, Form, Select } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionsUser, submitAnswer } from "../redux/apiRequest";
import { handleScoreChange } from "../redux/ScoreSlice";

function Questions() {
  const dispatch = useDispatch();
  const questionAmount = useSelector(
    (state) => state.questions.questions.amount
  );
  const answerResult = useSelector((state) => state.answers.answers.submit);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [options, setOptions] = useState([]);
  const [QuestionId, setId] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState("");
  const [type,setType] = useState("primary")

  const user = useSelector((state) => state.auth.login.currentUser.user);
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.tokens.access.token
  );
  const questionList = useSelector(
    (state) => state.questions.questions.allQuestions.results
  );
  const score = useSelector((state) => state.score.score);

  let [questionIndex, setQuestionIndex] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    getAllQuestionsUser(accessToken, dispatch, page, limit);
  }, []);

  const question = questionList[questionIndex];
  useEffect(() => {
    if (questionList.length) {
      let answers = [
        question.answer1,
        question.answer2,
        question.answer3,
        question.answer4,
      ];
      setOptions(answers);
      setId(question.id);
    }
  }, [questionList, questionIndex]);

  const handleFinish = () => {
    navigate("/questions");
    //mang du lieu cua so cau hoi de navigate sang
  };

  const handleNext = () => {
    if (questionIndex + 1 < questionAmount) {
      setQuestionIndex(questionIndex + 1);
    } else {
      navigate("/finalscore");
    }
    console.log(questionIndex)
    if(questionIndex + 1){
      setDisabled(false)
    }
    
  };
  const handleBack = () => {
    if (questionIndex + 1 <= questionAmount) {
      setQuestionIndex(questionIndex - 1);
    }
    if (questionIndex = 1){
      setDisabled(true)
    }
    // console.log(questionIndex)
    
  
  };
  const handleClick = (id) => {
    let correctAnswer = { id: question.id, correctanswer: options[id] };
    submitAnswer(accessToken, dispatch, correctAnswer);
    if (options[id] === answerResult[0].correctanswer) {
      dispatch(handleScoreChange(score + 1));
    }
    console.log(score);
  };

  return (
    <div>
      <nav className="header">
        <h1>
          Welcome <span> {user.username} </span>
        </h1>
        <Button
          type="primary"
          className="logout_btn"
          onClick={() => navigate("/")}
        >
          Log out
        </Button>
      </nav>

      <Form className="playscreen" onFinish={handleFinish}>
        <Form.Item>
          <h1>
            Question {questionIndex + 1} / {questionAmount}
          </h1>
        </Form.Item>
        <Form.Item>
          <h1>{questionList[questionIndex].question}</h1>
        </Form.Item>
        <Form.Item>
          {options.map((data, id) => (
            <Button
              key={id}
              block
              style={{ margin: "5px 10px" }}
             
              onClick={() => {
                handleClick(id)}}
            >
              {data}
            </Button>
          ))}
        </Form.Item>

        <Form.Item>
          <Button
            onClick={handleBack}
            style={{ marginRight: "60px" }}
            disabled={disabled}
          >
            Back
          </Button>
          <Button onClick={handleNext}>Next</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Questions;
