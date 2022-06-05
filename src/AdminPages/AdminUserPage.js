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

function AdminUserPage() {
  //neu null thi ke luon
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(10);
  const [dataSource, setDataSource] = useState([]);
  //adduser
  const [isAdding, setIsAdding] = useState(false);
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  //
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users.users?.allUsers.results);
  let accessToken = useSelector((state) => state.auth.login?.currentUser.tokens.access.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user?.tokens.access.token) {
      getAllUsers(user?.tokens.access.token, dispatch, currentPage, limit);
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
