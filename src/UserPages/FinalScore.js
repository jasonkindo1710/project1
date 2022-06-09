import "antd/dist/antd.css";
import "./User.css";
import { useNavigate } from "react-router-dom";
import { Button, Form, Select } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionsUser, submitAnswer } from "../redux/apiRequest";
import { handleAmountChange } from "../redux/questionSlice";
import { handleScoreChange } from "../redux/ScoreSlice";

function FinalScore() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser.user);
  const score = useSelector((state) => state.score.score);
  const amount = useSelector((state) => state.questions.questions.amount);
  const percent = (score / amount) * 100;
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.tokens.access.token
  );

  const handleBackToSettings = () => {
    dispatch(handleScoreChange(0));
    dispatch(handleAmountChange(10));
    navigate("/playscreen");
  };
  const handleBackToQuiz = () => {
    dispatch(handleScoreChange(0))
    dispatch(handleAmountChange(amount))
    navigate('/question')
  }
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

      <Form className="playscreen">
        <Form.Item>
          <h1> Final Score</h1>
        </Form.Item>
        <Form.Item>
          <h1>
            You get {score} out of {amount}
          </h1>
        </Form.Item>
        <Form.Item>
          <h1>Your score is: {percent}%</h1>
        </Form.Item>
        {percent < 60 ? (
          <Form.Item>
            <p>You need at least 60% to pass</p>
            <Button onClick={handleBackToQuiz} className="Button__Back">Retry</Button>
          </Form.Item>
        ) : (
          <Form.Item>
            <p>Congratulation! You have passed!</p>
            <Button onClick={handleBackToSettings} className="Button__Back">Back to Settings!</Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
}

export default FinalScore;
