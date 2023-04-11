import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import { login } from "../Redux/apiCalls";
import "./Login.css";
import PacmanLoader from "react-spinners/PacmanLoader";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { isFetching, error } = useSelector((state) => state.user);

  const handelLogin = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <div className="login">
      <Navbar />
      <div className={isFetching ? "loader_wrapper" : "hide"}>
        <PacmanLoader
          loading={isFetching}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="loader"
        />
        <span>Please Wait it's a free server so it take time :( </span>
      </div>

      <div className="login__info">
        <h3>Login :</h3>
        <form action="">
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name=""
            id=""
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>
            {" "}
            By loggin in, I agree to the <br /> <strong>Terms and use</strong> &
            <strong>Privacy Policy</strong>
          </p>
          {error && (
            <div className="login__error">Wrong Username or password !!</div>
          )}
          <button onClick={handelLogin} disabled={isFetching}>
            LogIn
          </button>
          <span className="login__links">
            <p>Forgot Password</p>
            <p>Create New Account</p>
          </span>
        </form>
      </div>
    </div>
  );
};
