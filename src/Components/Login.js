import "antd/dist/antd.css";
import "./Login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { loginUser } from "../redux/apiRequest";
import { useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSignIn } from "@fortawesome/free-solid-svg-icons"
import {faUser} from "@fortawesome/free-regular-svg-icons"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const handleLogin = async () => {
      const newUser = {
        username: username,
        password: password,
      };
      setLoading(true);
      await loginUser(newUser, dispatch, navigate);
      setLoading(false);
    
  };

  return (
    <div className="login">
      <ClipLoader color={color} loading={loading} css={override} />
      <Form className="login-form" onFinish={handleLogin}>
        <h1>Sign In
        <span><FontAwesomeIcon icon={faUser} style={{marginLeft: '10px', height: '25px', marginBottom: '3px'}}  ></FontAwesomeIcon></span>
        </h1>
        <Form.Item
          label="User Name"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="prefix" />}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="prefix" />}
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
