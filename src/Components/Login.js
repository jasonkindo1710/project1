import "antd/dist/antd.css";
import "./Login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { loginUser } from "../redux/apiRequest";
import {useDispatch} from 'react-redux'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogin = () => {
    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate)
  }
  

  return (
    <div className="login">
      <Form className="login-form" onFinish={handleLogin}>
        <h1>Sign In</h1>
        <Form.Item label="User Name" name="username">
          <Input
            prefix={<UserOutlined className="prefix" />}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          ></Input>
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input
            prefix={<LockOutlined className="prefix" />}
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
