import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import AppBar from "./components/AppBar";
import { setUser } from "./store/auth.js";

function App() {
  const token = Cookies.get("token");

  const dispatch = useDispatch();

  async function fetchUser() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const user = await res.json();
      dispatch(setUser(user));
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}

export default App;
