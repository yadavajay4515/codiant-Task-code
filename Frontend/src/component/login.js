import React from "react";
import { useState} from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import Homepage from "./homepage";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",

  });
  const [error, setError] = useState();
  const handleChange = (e) => {  

    setUser({...user, [e.target.name]: e.target.value});
  };


  const login = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8000/loginRegister/Login", user)
    .then((res) => {
      console.log(res)
       if(res.data.success){
        sessionStorage.setItem("token",res.data.authtoken)

       const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(<Homepage />)
      }
      if(res.data.error){
        setError(res.data.error)

      }
  
    });
  };

   return (
    <>
     
       <div className="container col-xl-10 col-xxl-8 px-4 py-1">
                <div className="row align-items-center g-lg-5 py-1">
                    <div className="col-lg-7 text-center text-lg-start">
                        <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">Login Here</h1>
                        <p className="col-lg-10 fs-4">Please try to login with correct credentials</p>
                    </div>
                    <div className="col-md-10 mx-auto col-lg-5">
                        <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={login}>
            
                         
                            <div>
                                <h4 className='d-flex justify-content-center align-items-center'>Login system</h4>
                                <p style={{color:"red",marginLeft:"76px"}}>{error}</p>
                            </div>
                            <div className="mb-3">

                                <input type="email" className="form-control" id="email"  value={user.email} name='email'  onChange={handleChange} aria-describedby="emailHelp" placeholder='Email Address'  required />
                            </div>
                          
                            <div className="mb-3">

                                <input type="password" className="form-control" id="password"  value={user.password} onChange={handleChange}name='password' placeholder='Password'  required />
                            </div>

                            <button className="w-100 btn btn-lg btn-primary" type="submit">Log In</button>
                            <hr className="my-4" />
                            <small className="text-body-secondary">By clicking Log in, you agree to the terms of use.</small>
                        </form>
                    </div>
                </div>
            </div>
        
    </>
  );
}
