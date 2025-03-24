import { meService } from "@/services/authService";
import { useAuth } from "@/store/slices/authSlice";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Header() {
  const { token, isAuthenticated, user } = useSelector((state) => state.auth);
  const { loginAction, logoutAction } = useAuth();

  useEffect(() => {
    const authToken = Cookies.get("token") || null;

    if (authToken && authToken !== undefined) {
      const getMeData = async () => {
        try {
          const { success, user } = await meService();
          if (success && user) {
            loginAction({ user: user, token: authToken });
          } else {
            logoutAction();
          }
        } catch (error) {
          logoutAction();
        }
      };
      getMeData();
    } else {
      logoutAction();
    }
  }, [isAuthenticated]);

  const logoutHandle = () => {
    logoutAction();
  };

  return token && isAuthenticated ? (
    <div className="header">
      <h3>Hoş Geldin: {user?.fullname} </h3>
      <button onClick={logoutHandle}>çıkış yap</button>
    </div>
  ) : (
    <Link href="/">Homepage</Link>
  );
}
