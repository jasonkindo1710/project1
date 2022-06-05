import React, { useState } from 'react'
import 'antd/dist/antd.css';
import './Login.css';
import {Form, Input, Button} from 'antd'
import {LockOutlined, UserOutlined, MailOutlined} from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../redux/apiRequest';
import { useDispatch } from 'react-redux';


function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
   
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleRegister = () => {
      const newUser = {
        username: username,
        email: email,
        password: password
      };
      registerUser(newUser, dispatch, navigate)
    }
  
  return (
    <div className="login">
      <Form className='login-form' onFinish={handleRegister}>
        <h1>Register</h1>
        <Form.Item label='User Name' name='username'>
          <Input prefix={<UserOutlined className='prefix' />} placeholder='Username' required  onChange={(e) => setUsername(e.target.value)}/>
        </Form.Item>
        <Form.Item label='Email' name='email'>
          <Input prefix={<MailOutlined className='prefix' />} placeholder='Email' required onChange={(e) => setEmail(e.target.value)}/>
        </Form.Item>
        <Form.Item label='Password' name='password'>
          <Input prefix={<LockOutlined className='prefix'/>} type='password' placeholder='Enter your Password' required onChange={(e) => setPassword(e.target.value)}/>
        </Form.Item>
        <Form.Item>
          <Button block type='primary' htmlType='submit'  className='login-form-button'>Sign Up</Button>
          Already a user? <Link to="/">Sign in now!</Link>
        </Form.Item>
       
      </Form>
    </div>
  )
}

export default Register