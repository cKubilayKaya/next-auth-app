import { meService } from "@/services/authService";
import { useAuth } from "@/store/slices/authSlice";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { loginAction, logoutAction } = useAuth();

  useEffect(() => {
    const authToken = Cookies.get("token") || null;

    if (authToken) {
      const getMeData = async () => {
        try {
          const { success, user } = await meService();
          if (success && user) {
            loginAction({ user: user, token: authToken });
          } else {
            logoutAction();
          }
        } catch (error) {
          console.log("Kullanıcı verisi alınırken hata oluştu:", error?.message);
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

  return (
    isAuthenticated && (
      <>
        <h3>Hoş Geldin: {user?.fullname}</h3>
        <br />
        <br />
        <button onClick={logoutHandle}>çıkış yap</button>
        <br />
        <br />
      </>
    )
  );
}
