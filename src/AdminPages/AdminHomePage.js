import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";


function AdminHomePage() {
  const user = useSelector((state) => state.auth.login?.currentUser);
 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <nav className="header">
        <h1>
          Welcome <span> {user.user.username} </span>
        </h1>
        <Button
          type="primary"
          className="logout_btn"
          onClick={() => navigate("/")}
        >
          Log out
        </Button>
      </nav>
      <div>
        <Link to='adminuser'>User Management</Link>
        <Link to='adminquestion'>Question Management</Link>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminHomePage;
