import "antd/dist/antd.css";
import "./User.css";
import { useNavigate } from "react-router-dom";
import { Button, Form, Select } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionsUser, submitAnswer } from "../redux/apiRequest";
import { handleScoreChange } from "../redux/ScoreSlice";
import { logOut } from "../redux/apiRequest";
import { useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

function Questions() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [options, setOptions] = useState([]);
  const [QuestionId, setId] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState("");
  const [type, setType] = useState("primary");
  const [questionID, setQuestionID] = useState("");
  let [answerResult, setAnswerResult] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  //spinner
  const override = css`
    position: fixed;
    left: 50%;
    top: 35%;
    height: 50px;
    width: 50px;
    z-index: 9999;
    border-color: #0048ba;
    background-color: black;
  `;
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const dispatch = useDispatch();
  const questionAmount = useSelector(
    (state) => state.questions.questions.amount
  );

  const user = useSelector((state) => state.auth.login.currentUser?.user);
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.tokens.access.token
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
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser?.tokens?.refresh.token
  );
  const handleLogout = async () => {
    setLoading(true)
    await logOut(refreshToken, dispatch, navigate);
  };

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

  const buttonRef = useRef([]);
  const handleClick = (id) => {
    let correctAnswer = { id: question.id, correctanswer: options[id] };
    buttonRef.current.push(correctAnswer);
  };

  const handleNext = () => {
    if (questionIndex + 1 < questionAmount) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const handleSubmit = async () => {
    let finalResult = buttonRef.current;

    setLoading(true);
    await submitAnswer(accessToken, dispatch, finalResult);
    navigate("/finalscore");
  };

  const handleBack = () => {    
    if (questionIndex > 0){
      setQuestionIndex(questionIndex - 1)
    }  
    if(questionIndex <= 0) {
      setQuestionIndex(questionIndex)
    }
  };
  const handleSkip = () => {
    if (questionIndex + 1 < questionAmount) {
      setQuestionIndex(questionIndex + 2);
    }
   if (questionIndex + 1 == questionAmount - 1){
     setQuestionIndex(questionIndex)
   }
  }

  return (
    <div>
      <ClipLoader color={color} loading={loading} css={override} />
      <nav className="header">
        <h1>
          Welcome <span> {user?.username} </span>
        </h1>
        <Button type="primary" className="logout_btn" onClick={handleLogout}>
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
                handleClick(id);
              }}
            >
              {data}
            </Button>
          ))}
        </Form.Item>

        <Form.Item>
          <div className="select">
            <Button onClick={handleBack}>
              Back
            </Button>
            {questionIndex + 1 == questionAmount ? (
              <Button onClick={handleSubmit}>Submit</Button>
            ) : (
              <Button onClick={handleNext}>Save & Next</Button>
            )}
            <Button onClick={handleSkip}>
              Skip
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Questions;
