import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home/Home";
import Login from "./Components/Login_Register/Login";
import Profile from "./Components/Home/Pages/Profile";
import Settings from "./Components/Home/Pages/Settings";
import Messages from "./Components/Home/Pages/Messages";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./Features/Userslice";

export default function App() {
  const isloggedin = useSelector(selectUser);

  return (
    <>
      {!isloggedin ? (
        <Login />
      ) : (
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/profile/:name" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/messenger" element={<Messages />} />
          </Route>
        </Routes>
      )}
    </>
  );
}
