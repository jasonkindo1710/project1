import React, { useState } from "react";
import "antd/dist/antd.css";
import "./Login.css";
import { Form, Input, Button } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../redux/apiRequest";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("")

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRegister = () => {
    const newUser = {
      username: username,
      email: email,
      password: password,
    };
    registerUser(newUser, dispatch, navigate);
  };

  return (
    <div className="login">
      <Form className="login-form" onFinish={handleRegister}>
        <h1>
          Register{" "}
          <span>
            <FontAwesomeIcon
              icon={faSignIn}
              style={{ marginLeft: "2px" }}
            ></FontAwesomeIcon>
          </span>
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
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="prefix" />}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
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
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Confirm"
          name="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please input your confirm password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className="prefix" />}
            type="password"
            placeholder="Enter Your Confirm Password"
            onChange={(e) => setConfirm(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign Up
          </Button>
          Already a user? <Link to="/">Sign in now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
