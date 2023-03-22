import "./App.css";
import { AllProduct } from "./Pages/AllProduct";
import { Cart } from "./Pages/Cart";
import Home from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { ViewProduct } from "./Pages/ViewProduct";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { NotFound } from "./Pages/NotFound";
import { Success } from "./Pages/Success";
import { useSelector } from "react-redux";
function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          ></Route>
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          ></Route>
          <Route path="/product/:id" element={<ViewProduct />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/products/:category" element={<AllProduct />}></Route>
          <Route path="/success" element={<Success />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
