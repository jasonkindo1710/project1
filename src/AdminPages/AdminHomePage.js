import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./admin.css";
import { logOut } from "../redux/apiRequest";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

function AdminHomePage() {
  const user = useSelector((state) => state.auth.login?.currentUser);
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
  `;
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const [bgColor, setBgColor] = useState("#ffffff");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    setLoading(true);
    await logOut(refreshToken, dispatch, navigate);
    setLoading(false);
  };

  return (
    <div>
      <ClipLoader color={color} loading={loading} css={override} />
      <nav className="header">
        <h1>
          Welcome <span> {user?.user.username} </span>
        </h1>
        <img src={avatar} className="avatar" />
        <Button type="primary" className="logout_btn" onClick={handleLogout}>
          Log out
        </Button>
      </nav>
      <div className="background" >
        <div className="btnDiv" >
          <Button className="btn_manage">
            <Link to="adminuser">Users</Link>
          </Button>
          <Button className="btn_manage">
            <Link to="adminquestion">Questions</Link>
          </Button>
        </div>
      </div>
      <Outlet />
      <div className="addon">
      </div>
    </div>
    
  );
}

export default AdminHomePage;
