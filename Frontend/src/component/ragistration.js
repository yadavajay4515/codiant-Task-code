import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Ragistration() {
  const [user, setuser] = useState({
    name: "",
    email: "",
    phonenumber: "",
    password: "",
    image: "",
   
  });

  const [msg, setmsg] = useState({ msgs: "", error: "" });
  const history = useHistory();
  const handalevent = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setuser({
      ...user,
      [name]: value,
    });
  };
 
 
  const handleImageChange = (event) => {
    setuser({ ...user, image: event.target.files[0] });
  };

  
const formData = new FormData();
  formData.append("name", user.name);
  formData.append("email", user.email);
  formData.append("phonenumber", user.phonenumber);
  formData.append("password", user.password);
   formData.append("image", user.image);
  const register = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8000/loginRegister/register", formData).then((res) => {
      console.log(res);
      if (res.data.success) {
        sessionStorage.setItem("token", res.data.token);
        setmsg({ error: "" });
        setmsg({ msgs: "successfully register" });
        // history.push("/login");
      }
      if (res.data.error) {
        setmsg({ msgs: "" });
        setmsg({ error: res.data.error });
      }
    });
  };

  return (
    <div className="container mt-2 pt-3">
      
    
      <div className="col-md-4 mx-auto col-lg-7">
        <form
          onSubmit={register}
          encType="multipart/form-data"
          style={{ marginLeft: "20px", padding: "6rem" }}
          className="p-4 p-md-4 border rounded-2 bg-body-tertiary"
        >
            <h2 style={{ marginLeft: "180px" }}>Registration Form </h2>
         <h4 style={{ color: "green",marginLeft: "200px" }}>{msg.msgs}</h4>
         <p style={{ color: "red",marginLeft: "180px" }}>{msg.error}</p>
          <div className="mb-4">
            <label
              htmlFor="Name"
              className="form-label"
              style={{ color: "black" }}
            >
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              id="name"
              name="name"
              onChange={handalevent}
              value={user.name}
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label"
              style={{ color: "black" }}
            >
              Email
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your email"
              id="email"
              name="email"
              onChange={handalevent}
              value={user.email}
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="MobileNumber"
              className="form-label"
              style={{ color: "black" }}
            >
              Phone number {" "}
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter your phonenumber"
              id="phonenumber"
              name="phonenumber"
              onChange={handalevent}
              value={user.phonenumber}
              aria-describedby="phonenumber"
              required
            />
          </div>
     

     

          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label"
              style={{ color: "black" }}
            >
              password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              name="password"
              onChange={handalevent}
              value={user.password}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label"
              style={{ color: "black" }}
            >
              Profile picture 
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
              className="form-control"
              id="file"
              placeholder="Enter your profilepicture"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            SignUp
          </button>
        </form>
      </div>
    
    </div>
  );
}
