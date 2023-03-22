import React from "react";
import "./Navbar.css";
import { Badge } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logOut } from "../Redux/userSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const quantity = useSelector((state) => state.cart.quantity);

  const signOut = () => {
    dispatch(logOut({ user }));
  };

  console.log(user);

  return (
    <div className="navbar">
      <div className="navbar__left">
        <span>EN</span>
        <div className="navbar__search">
          <input type="text" className="navbar__input" />
          <SearchIcon style={{ color: "grey", fontSize: "26px" }} />
        </div>
      </div>
      <div className="navbar__center">
        <Link to={`/`} style={{ textDecoration: "none", color: "black" }}>
          <h1 className="navbar__logo">ZEPP.</h1>
        </Link>
      </div>
      <div className="navbar__right">
        <Link
          to={`/register`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="navbar__item">{user ? null : "REGISTER"}</div>
        </Link>

        <Link to={`/login`} style={{ textDecoration: "none", color: "black" }}>
          <div onClick={signOut} className="navbar__item">
            {user ? "SignOut" : null}
          </div>
        </Link>
        {user && <div className="navbar__item">{user.username}</div>}

        <Link to={`/login`} style={{ textDecoration: "none", color: "black" }}>
          <div className="navbar__item">{user ? null : "SignIn"}</div>
        </Link>

        <Link to={user ? `/cart` : `/login`}>
          <div className="navbar__item">
            <Badge badgeContent={quantity} color="secondary">
              <ShoppingCartOutlined color="action" />
            </Badge>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
