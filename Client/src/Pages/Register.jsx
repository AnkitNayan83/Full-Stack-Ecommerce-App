import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import "./Register.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Redux/apiCalls";
import PacmanLoader from "react-spinners/PacmanLoader";

export const Register = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handelClick = (e) => {
    e.preventDefault();
    register(dispatch, { username, password, email });
  };
  const { isFetching, error } = useSelector((state) => state.user);
  return (
    <div className="register">
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

      <div className="register__info">
        <h3>Create Your Account</h3>
        <form action="">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input
            type="email"
            placeholder="email eg:xyz@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="password" placeholder="Confirm Password" />
          <input type="date" placeholder="Birth Date" />
          <p>
            By registering, I agree to the <br /> <strong>Terms and use</strong>{" "}
            &<strong>Privacy Policy</strong>
          </p>
          <button onClick={handelClick}>Register</button>
        </form>
      </div>
    </div>
  );
};
