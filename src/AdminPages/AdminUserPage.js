import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addNewUser, deleteUser, getAllUsers } from "../redux/apiRequest";
import { Table, Modal, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { loginSuccess } from "../redux/authSlice";
import './admin.css'
import axios from "axios";
import jwt_decode from "jwt-decode"

function AdminUserPage() {
  //neu null thi ke luon
  const [limit, setLimit] = useState(150);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(8);
  const [dataSource, setDataSource] = useState([]);
  //adduser
  const [isAdding, setIsAdding] = useState(false);
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  //
  const user = useSelector((state) => state?.auth.login?.currentUser);
  const userList = useSelector((state) => state?.users.users?.allUsers?.results);
  let accessToken = useSelector((state) => state.auth.login?.currentUser.tokens.access.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let axiosJWT = axios.create();
  const refreshToken = async () => {
    try{
      const res = await axios.post("https://fwa-ec-quiz-mock1.herokuapp.com/v1/auth/refresh-tokens", {
        withCredentials: true,
      })
      console.log(res.data)
      return res.data
     
    }
    catch(err){
      console.log(err)
    }
  }
  axiosJWT.interceptors.request.use(
    async(config) => {
      let date = new Date()
      const decodedToken = jwt_decode(accessToken)
      if(decodedToken.exp < date.getTime()/1000){
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          tokens: data.tokens
        };
        dispatch(loginSuccess(refreshUser))
        config.headers["token"] = "Bearer " + data.tokens.access.token
      }
      return config;
    },
    (err) => {
      return Promise.reject(err)
    }
  )

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user?.tokens.access.token) {
      getAllUsers(user?.tokens.access.token, dispatch, currentPage, limit, axiosJWT);
    }
  }, []);

  useEffect(() => {
    setDataSource(userList);
  }, []);

  const addUser = () => {
    setIsAdding(true)
  }
  const handleAddUser = () => {
    const newUser = {
      username: username,
      password: password,
      email: email,
      role: role
    }
    addNewUser(user?.tokens.access.token, newUser, dispatch)
    setIsAdding(false)
  }
  const handleDelete = (id) => {
    deleteUser(accessToken, dispatch, id)
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "1",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "2",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "3",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "4",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "5",
      render: () => {
        return <>
          <EditOutlined />
          <DeleteOutlined 
          onClick={() => handleDelete(user._id)}
          style={{color: "red", marginLeft: 12}}/>
        </>
      }
    }
  ];
  return (
    <div>
      <Button className="btn_add" onClick={addUser}>Add a new user</Button>
      <Table className="table" dataSource={dataSource} columns={columns} pagination={true}> </Table>
      <Modal
        title = "Adding a new user"
        visible = {isAdding}
        onCancel = {() => setIsAdding(false)}
        onOk = {handleAddUser}
        okText = "Save"
      >
        <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
        <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <Input placeholder="Role" onChange={(e) => setRole(e.target.value)}/>
      </Modal>
    </div>
  );
}

export default AdminUserPage;
