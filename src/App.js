import React, { useEffect } from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";

import AdminHomePage from "./AdminPages/AdminHomePage";
import PlayScreen from "./UserPages/PlayScreen";
import FinalScore from "./UserPages/FinalScore";
import Questions from "./UserPages/Questions";
import { Routes, Route } from "react-router-dom";
import AdminUserPage from "./AdminPages/AdminUserPage";
import AdminQuestionPage from "./AdminPages/AdminQuestionPage";
import { useDispatch, useSelector } from "react-redux";
import PageNotFound from "./RouteGuard/PageNotFound";

import tokenExpired from "./redux/tokenExpired";
import { refresh } from "./redux/apiRequest";
import { AdminRole, RedirectRole, UserRole } from "./RouteGuard/RouterGuard";

function App() {
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.tokens.access.token
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser?.tokens.refresh.token
  );
  const role = useSelector(
    (state) => state.auth.login.currentUser?.user.role
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (accessToken && refreshToken) {
      tokenExpired(accessToken, () => {
        refresh(refreshToken, dispatch);
      });
    }
  }, [accessToken, refreshToken, dispatch]);
  return (
    <Routes>
      <Route element={<RedirectRole accessToken={accessToken} role={role} />}>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        
      </Route>
      <Route element={<UserRole accessToken={accessToken} role={role} />}>
        <Route path="playscreen" element={<PlayScreen />} />
        <Route path="finalscore" element={<FinalScore />} />
        <Route path="question" element={<Questions />} />
      </Route>
      <Route element={<AdminRole accessToken={accessToken} role={role} />}>
        <Route path="adminhome" element={<AdminHomePage />}>
          <Route path="adminuser" element={<AdminUserPage />} />
          <Route path="adminquestion" element={<AdminQuestionPage />} />
        </Route>
      </Route>
      <Route element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
