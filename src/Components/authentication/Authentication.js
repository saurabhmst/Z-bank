import React, { useEffect, useState } from "react";
import { login } from "../../Service/userAuthentication";
import { Navigate, useNavigate } from "react-router-dom";
import "./Authentication.css";

const UserLogin = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [passShow,setPassShow]=useState("password");
  const naviagte = new useNavigate();

  const handleMySubmit = async (e) => {
    e.preventDefault();
    console.log("userName>>>>>>>>>", userName);
    console.log("password>>>>", password);

    let response = await login(userName, password);

    if (response.data.role == "ROLE_ADMIN");
    {
      console.log(response);
      localStorage.setItem(
        "access_token",
        "Bearer " + response.headers["auth"]
      );
      console.log(
        "username and id are ",
        response.data.name,
        response.data.userId
      );
      localStorage.setItem("username", response.data.name);
      console.log("role is " + response.data.role);
      naviagte("/admin_dash_board");
    }

    if (response.data.role == "ROLE_USER") {
      console.log("role is " + response.data.role);
      naviagte("/customer_dash_board");
    }
  };

  return (
    <div className="container mt-5">
      <div style={{ marginTop: "20vh" }}>
        <div className="text-center text-dark m-5">
          <h1>Login form</h1>
        </div>

        <div className="row">
          <div className="offset-4 col-4">
            <form className="shadow-lg p-5 rounded-border border-warning">
              <div className="mb-2">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control rounded-pill"
                  aria-describedby="emailHelp"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Password</label>
               <div className="d-flex">
                <input
                  type={passShow}
                  className="form-control rounded-pill"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button
                className="border-0 btn btn-outline-primary"
                onClick={
                    (e)=>{
                        e.preventDefault()
                        passShow=="text"?setPassShow("password"):setPassShow("text")
                    }
                }
                > <i class="bi bi-eye-fill px-3"></i></button>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleMySubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "40vh" }}></div>
    </div>
  );
};

export default UserLogin;
