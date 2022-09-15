import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./Login.css";
import Register from "./Register";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Features/Userslice";
import { useCookies } from "react-cookie";

function Login() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(["name"]);
  document.title = "Fackbook - log in or sign up";
  const [logloding, setlogloding] = useState(false);
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [pop, setpop] = useState(false);
  const [error, seterror] = useState(false);

  const reg_popup = () => {
    setpop(true);
  };

  const login_submit = async () => {
    if (email.length > 4 && pass) {
      setlogloding(true);
      seterror(false);
      await fetch(`${process.env.REACT_APP_API}/auth/login`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: pass
        })
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            // console.log("error", res.message);
            seterror(true);
            setpass("");
          } else {
            // console.log("success", res);
            setCookie("token", res.user._id, { path: "/" });
            dispatch(
              login({
                user: res.user
              })
            );
            // localStorage.setItem("user", JSON.stringify({ user: res.user }));
            // navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setlogloding(false);
    }
  };

  return (
    <>
      {error && (
        <div className="logerror">
          <Alert severity="error">
            <AlertTitle>
              <b>Error</b>
            </AlertTitle>
            Invalied Email or Password!
            <CloseIcon onClick={() => seterror(false)} className="errc" />
          </Alert>
        </div>
      )}
      <div className="login">
        <div className="login_left">
          <div className="login_logo">
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
              alt=""
            />
          </div>
          <div className="login_lh">
            Facebook helps you connect and share with the people in your life.
          </div>
        </div>
        <div className="login_right">
          <div className="login_rbox">
            <input
              type="email"
              className="login_text"
              value={email}
              placeholder="Email address or phone number"
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              className="login_text"
              value={pass}
              placeholder="Password"
              onChange={(e) => setpass(e.target.value)}
            />
            <Button
              className="log_btn"
              variant="contained"
              color="primary"
              onClick={login_submit}
            >
              Log In
              {logloding && <CircularProgress className="logspin" />}
            </Button>
            <p className="forpass">Forgotten Password?</p>
            <hr className="log_hr" />
            <Button
              className="log_btnnew"
              variant="contained"
              color="success"
              onClick={reg_popup}
            >
              Create New Account
            </Button>
          </div>
          <p className="l_L">
            <strong>Create a Page </strong>for a celebrity, brand or business.
          </p>
        </div>
      </div>
      <Register trigger={pop} settrigger={setpop} />
    </>
  );
}

export default Login;
