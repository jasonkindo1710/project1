import "antd/dist/antd.css";
import "./User.css";
import { useNavigate } from "react-router-dom";
import { Button, Form, Select, Input } from "antd";
import { handleAmountChange } from "../redux/questionSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { getAllQuestionsUser } from "../redux/apiRequest";
import { logOut } from "../redux/apiRequest";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

function PlayScreen() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const user = useSelector((state) => state.auth.login.currentUser?.user);
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.tokens?.access.token
  );
  const refreshToken = useSelector((state) => state.auth.login.currentUser?.tokens?.refresh.token)
  
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getAllQuestionsUser(accessToken, dispatch, page, limit);
  }, []);
  const handleLogout = async () => {
    setLoading(true)
    await logOut(refreshToken, dispatch, navigate)
  }
  const handleFinish = () => {
    navigate("/question");
    //mang du lieu cua so cau hoi de navigate sang
  };
  const handleAmount = (e) => {
    dispatch(handleAmountChange(e.target.value));
  };

  return (
    <div>
      <ClipLoader color={color} loading={loading} css={override} />
      <nav className="header">
        <h1>
          Welcome <span> {user?.username} </span>
        </h1>
        <Button
          type="primary"
          className="logout_btn"
          onClick={handleLogout}
        >
          Log out
        </Button>
      </nav>

      <Form className="playscreen" onFinish={handleFinish}>
        <h1>Play Screen</h1>
        <Form.Item label="Select the number of questions:" name="amount"
        rules={[
          {
            required: true,
            message: 'Please select the number of questions!',
          },
        ]}>
          <Input type="number" onChange={handleAmount}/>
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Let's Start
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PlayScreen;
