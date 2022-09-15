import Main from "./Main";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Home.css";

// import { useNavigate } from "react-router-dom";
function Home() {
  // const navigate = useNavigate();

  // const auth = sessionStorage.getItem("user");
  // useEffect(() => {
  //   if (!auth) {
  //     navigate("/auth");
  //   }
  // });

  return (
    <>
      <div className="homemai">
        <div className="homeside">
          <Sidebar />
        </div>
        <div className="homemain">
          <Main />
        </div>
        <div className="homeside2">
          <Sidebar />
        </div>
      </div>
    </>
  );
}

export default Home;
