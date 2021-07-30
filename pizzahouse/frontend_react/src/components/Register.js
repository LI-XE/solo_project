import { navigate } from '@reach/router';
import Axios from 'axios'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { domain, header } from '../env'

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    // const history = useHistory()

    const registerBtn = async () => {

        if (password !== confirmPassword) {
            alert("Password not match! Try again !")
        } else {
            await Axios({
                method: "post",
                url: `${domain}/api/register/`,
                headers: header,
                data: {
                    "username": username,
                    "email": email,
                    "password": password
                }
            }).then(response => {
                // console.log(response.data);
                if (response.data["data"]) {
                  navigate("/login")
                  
                }
                // console.log(response.data["message"]);
                alert(response.data["message"])
            }) 
            
        }
    }

  return (
    <div className="reglog_container">
      <h1 className="mb-5">Register</h1>
      <div> 
          <div className="mb-3 row ">
            <label className="col-sm-4 col-form-label fw-bold">Username:</label>
            <div className="col-sm-8">
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                placeholder="Username"
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-4 col-from-label fw-bold">Email:</label>
            <div className="col-sm-8 col-form-control">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="name@example.com"
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-4 col-form-label fw-bold">Password:</label>
            <div className="col-sm-8 col-form-control">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Password"
              />
          </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-4 col-form-label fw-bold">Confirm Password:</label>
            <div className="col-sm-8">
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div className="center">
            <button 
              type="submit"
              className="btn btn-success"
              onClick={registerBtn}
            >Register</button>
          </div>
      </div>
    </div>
      
  );
};

export default Register;