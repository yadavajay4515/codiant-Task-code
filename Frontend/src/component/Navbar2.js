// import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Navbar2() {
  const [roledata, setroledata] = useState([]);

  // useEffect(() => {
  //   if (sessionStorage.getItem("token")) {
  //     student();
  //   }
  // }, []);

  // const student = () => {
  //   axios
  //     .get(
  //       "http://localhost:9002/auth/getragisterdata",
  //       {},
  //       {
  //         headers: {
  //           "auth-token": sessionStorage.getItem("token"),
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res);
  //       console.log(res.data);
  //       setroledata(res.data);
  //     });
  // };

  const logout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
           Codiant Yash technology
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="btn btn-primary mx-1"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Add your product
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/Addproduct">
                      Add product items
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/productlist">
                      Product List
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="btn btn-primary mx-1"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  login user details
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/adduser">
                      All login user data
                    </Link>
                  </li>
                </ul>
              </li>
            
              
            </ul>

            <>
            {/* {roledata.map((data, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                  <td style={{ color: "white" }}>{data.Name}</td>
                  </tr>
                  );
                })} */}

<div className="btn-group">
                <button
                  className="btn btn-success btn-sm dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="true"
                  aria-expanded="false"
                >
                  {roledata.Name} Logout user
                </button>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                  <li>
                    <button
                       className="dropdown-item"
                      style={{ marginRight: "20px" }}
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
                
                </>
          </div>
        </div>
      </nav>
    </>
  );
}
