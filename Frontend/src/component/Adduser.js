import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Adduser() {
  const [adduser, setadduser] = useState([]);

  useEffect(() => {
    student();
  }, []);

  const student = () => {
    axios
      .get("http://localhost:8000/loginRegister/getragisterdata", {
        headers: {
          "auth-token": sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })

      .then((res) => {
        console.log(res);
        setadduser(res.data);
      });
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update student
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <table className="table table-success my-5">
          <thead className="table-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">image</th>
              <th scope="col">phonenumber</th>
              <th scope="col">Email</th>
           
            </tr>
          </thead>
          <tbody>
            {adduser.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{data.name}</td>
                  <td>
                    <img
                      src={`http://localhost:8000/Backend/${data.files}`}
                      className="d-block mx-lg-auto img-fluid rounded-circle"
                      alt="Bootstrap Themes"
                      width="40"
                      height="40"
                      loading="lazy"
                    />
                  </td>
                  <td>{data.phonenumber}</td>
                  <td>{data.email}</td>
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
