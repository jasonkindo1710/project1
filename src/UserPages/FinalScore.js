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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faStar, faSadCry,  } from "@fortawesome/free-regular-svg-icons";

function FinalScore() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser?.user);
  const score = useSelector((state) => state.score.score);
  const amount = useSelector((state) => state.questions.questions.amount);
  const percent = Math.round((score / amount) * 100);

  const submit = useSelector((state) => state.answers.answers?.submit);
  const final = submit.filter((item) => item.result === true);
  console.log(final);
  dispatch(handleScoreChange(final.length));
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.tokens?.access.token
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser?.tokens?.refresh.token
  );
  const avatar = useSelector(
    (state) => state.auth.login?.currentUser?.user.avatar
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
    setLoading(true);
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
        <img src={avatar} className="avatar-user" />
        <Button type="primary" className="logout_btn" onClick={handleLogout}>
          Log out
        </Button>
      </nav>

      <div className="background-div-play ">
        <Form className="playscreen">
          <Form.Item>
            <div className="display">
              <h1> Final Score <span>
                    <FontAwesomeIcon
                      style={{ marginLeft: "5px", color: "green" }}
                      icon={faListCheck}

                    ></FontAwesomeIcon>
                  </span></h1>
              <h1>
                You get {score} out of {amount}
              </h1>
              <h1>Your score is: {percent}%</h1>
            </div>
          </Form.Item>
          {percent < 60 ? (
            <Form.Item>
              <div className="progress">
                <Progress
                  type="circle"
                  percent={100}
                  status="exception"
                  style={{ marginBottom: "20px" }}
                />
                <h3>
                  You need at least 60% to pass. Please try again!{" "}
                  
                  <span>
                    <FontAwesomeIcon
                      style={{ marginLeft: "5px" }}
                      icon={faSadCry}
                      beat
                    ></FontAwesomeIcon>
                  </span>
                </h3>
                <Button onClick={handleBackToQuiz} className="Button__Back">
                  Retry
                </Button>
                Or
                <Button onClick={handleBackToSettings} className="Button__Back">
                  Back to Settings!
                </Button>
              </div>
            </Form.Item>
          ) : (
            <Form.Item>
              <div className="progress">
                <Progress
                  type="circle"
                  percent={100}
                  style={{ marginBottom: "20px" }}
                />
                <h3>
                  Congratulation! You have passed!{" "}
                  <span>
                    <FontAwesomeIcon
                      style={{ marginLeft: "5px" }}
                      icon={faStar}
                      bounce
                    ></FontAwesomeIcon>
                  </span>
                  
                </h3>
                <Button onClick={handleBackToSettings} className="Button__Back">
                  Back to Settings!
                </Button>
              </div>
            </Form.Item>
          )}
        </Form>
      </div>
    </div>
  );
}

export default FinalScore;
