import "antd/dist/antd.css";
import "./User.css";
import { useNavigate } from "react-router-dom";
import { Button, Form, Select } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionsUser, submitAnswer } from "../redux/apiRequest";
import { handleAmountChange } from "../redux/questionSlice";
import { handleScoreChange } from "../redux/ScoreSlice";
import { logOut } from "../redux/apiRequest";
import { Progress } from "antd";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

function FinalScore() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser?.user);
  const score = useSelector((state) => state.score.score);
  const amount = useSelector((state) => state.questions.questions.amount);
  const percent = Math.round((score / amount) * 100);

  const submit = useSelector((state) => state.answers.answers?.submit);
  const final = submit.filter((item) => item.result === true);
  console.log(final)
  dispatch(handleScoreChange(final.length));
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.tokens?.access.token
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser?.tokens?.refresh.token
  );
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
  const handleLogout = async () => {
    setLoading(true)
    await logOut(refreshToken, dispatch, navigate);
  };

  const handleBackToSettings = () => {
    dispatch(handleScoreChange(0));
    dispatch(handleAmountChange(10));
    navigate("/playscreen");
  };
  const handleBackToQuiz = () => {
    dispatch(handleScoreChange(0));
    dispatch(handleAmountChange(amount));
    navigate("/question");
  };
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

      <Form className="playscreen">
        <Form.Item>
        <div className="display">
        <h1> Final Score</h1>
          <h1>
            You get {score} out of {amount}
          </h1>
          <h1>Your score is: {percent}%</h1>
        </div>
          
        </Form.Item>
        {percent < 60 ? (
          <Form.Item>
            <div className="progress">
              <Progress type="circle" percent={percent} status="exception" style={{marginBottom: "20px"}}/>

              <p>You need at least 60% to pass. Please try again</p>
              <Button onClick={handleBackToQuiz} className="Button__Back">
                Retry
              </Button>
            </div>
          </Form.Item>
        ) : (
          <Form.Item>
            <div className="progress">
              <Progress type="circle" percent={100} style={{marginBottom: "20px"}}/>
              <p>Congratulation! You have passed!</p>
              <Button onClick={handleBackToSettings} className="Button__Back">
                Back to Settings!
              </Button>
            </div>
          </Form.Item>
        )}
      </Form>
    </div>
  );
}

export default FinalScore;
