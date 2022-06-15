import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import { Button, Form, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addNewUser, deleteUser, getAllUsers } from "../redux/apiRequest";
import { Table, Modal, Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { loginSuccess } from "../redux/authSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import "./admin.css";

function AdminUserPage() {
  //neu null thi ke luon
  const [limit, setLimit] = useState(200);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(8);
  const [dataSource, setDataSource] = useState([]);
  const [searchText, setSearchText] = useState("");
  //adduser
  const [isAdding, setIsAdding] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [flag, setFlag] = useState(false);
  //spinner
  const override = css`
    position: fixed;
    left: 50%;
    top: 35%;
    height: 50px;
    width: 50px;
    z-index: 9999;
    border-color: #0048ba;
  `;
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const user = useSelector((state) => state?.auth.login?.currentUser);
  const userList = useSelector(
    (state) => state.users?.users.allUsers.results
  );
  console.log(userList)


  const total = userList?.length;
  let accessToken = useSelector(
    (state) => state?.auth.login.currentUser?.tokens.access.token
  );

  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user?.tokens.access.token) {
      setLoading(true);
      getAllUsers(user?.tokens.access.token, dispatch, currentPage, limit);
      setLoading(false);
    }
  }, [flag]);

  useEffect(() => {
    setDataSource(userList);
  }, []);
  const uniqueKey = dataSource?.map(item => item.username)

  const addUser = () => {
    setLoading(true);
    setIsAdding(true);
    setLoading(false);
  };
  const handleAddUser = async () => {
    const newUser = {
      username: username,
      password: password,
      email: email,
      role: role,
    };
    setLoading(true);
    await addNewUser(accessToken, newUser, dispatch);
    // setIsAdding(false);
    setFlag(!flag);
  };
  const handleDelete = (id) => {
    deleteUser(accessToken, dispatch, id);
    setFlag(!flag);
  };
  const { Option } = Select;
  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "1",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Search name"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
              className="dropdown_input"
            ></Input>
            <div className="dropdown_btn">
              <Button
                onClick={() => {
                  confirm();
                }}
                type="primary"
              >
                {" "}
                Search{" "}
              </Button>
              <Button
                onClick={() => {
                  clearFilters();
                  confirm();
                }}
                type="danger"
              >
                {" "}
                Reset{" "}
              </Button>
            </div>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.username.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "2",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Search email"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
              className="dropdown_input"
            ></Input>
            <div className="dropdown_btn">
              <Button
                onClick={() => {
                  confirm();
                }}
                type="primary"
              >
                {" "}
                Search{" "}
              </Button>
              <Button
                onClick={() => {
                  clearFilters();
                  confirm();
                }}
                type="danger"
              >
                {" "}
                Reset{" "}
              </Button>
            </div>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.email.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "3",
      sorter: {
        compare: (a, b) => a.role.localeCompare(b.role)
      },
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "4",
      sorter: {
        compare: (a, b) => a.score > b.score,
      },
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "5",
      render: (_, record) => (
        <img src={record.avatar} style={{ width: "50px" }} />
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "6",
      render: () => {
        return (
          <>
            <EditOutlined />
            <DeleteOutlined
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="background-div">
      <ClipLoader color={color} loading={loading} css={override} />
      <div className="total">
      <h3>Total Users: {total}</h3>
      <Button onClick={addUser} type="primary">
        Add a new user
      </Button>
      </div>
      

      <Table
        className="table"
        dataSource={dataSource}
        columns={columns}
        pagination={true}
        rowKey={uniqueKey}
        
      >
        {" "}
      </Table>
      <Modal
        title="Adding a new user"
        visible={isAdding}
        closable={false}
        footer={null}
      >
        <Form form={form} autoComplete="off">
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
              placeholder="Enter username..."
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
              type="email"
              placeholder="Enter email..."
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
              type="password"
              placeholder="Enter password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: "Please select Role",
              },
            ]}
          >
            <Select placeholder="Select Role..." onChange={(e) => setRole(e)}>
              <Option value="admin">admin</Option>
              <Option value="user">user</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <div className="btn_list">
              <Button onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button htmlType="submit" onClick={handleAddUser}>
                Save
              </Button>
              <Button
                onClick={() => {
                  console.log(form.resetFields());
                }}
              >
                Clear
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminUserPage;
