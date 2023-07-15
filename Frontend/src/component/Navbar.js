import React from "react";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <center>
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        {/* <nav className="navbar navbar-expand-lg navbar-light navbar-custom"> */}

        <div className="container-fluid">
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
            <Link className="navbar-brand" to="/">
            Codiant Yash technology  
          </Link>
             
            

            </ul>
            <center>

      
              <form className="d-flex navForm">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <Link
                  className="btn btn-primary mx-1 "
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-1 "
                  to="/ragistration"
                  role="button"
                >
                   Ragistration
                </Link>
              </form>

            </center>
          </div>
        </div>
      </nav>
    </div>

    <div className="col-lg-6">
        <h2 className="display-6 fw-bold text-body-emphasis lh-1 mb-3">Add product items system</h2>
        <p className="lead"> System is a management information system products</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
         </div>
         </div>

   </center>
  );
}
