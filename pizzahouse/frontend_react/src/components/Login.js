import Axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { domain, header2 } from '../env'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const loginbutton = async() => {
        Axios({
            url: `${domain}/api/login/`,
            method: "post",
            // headers: header2,
            data: {
                "username": username,
                "password": password
            }
        }).then(response => {
            console.log(response.data['token']);
            window.localStorage.setItem('token', response.data['token'])
            window.location.href = "/"
        }).catch(_ => {
            alert("Username OR Password is invalid Try Again !!")
        })
    }

    return (
        <div className="reglog_container my-5 p-5">
            <h1>Login</h1>
            {/* {
              errs.username ? 
                <span className="error-text">{ errs.username.message }</span>
                : null
            } */}
            <div className="mb-3 row ">
                <label className="col-sm-4 col-form-label fw-bold" >Username:</label>
                <div className="col-sm-8">
                    <input onChange={e => setUsername(e.target.value)} type="text" className="form-control" placeholder="Username" value={username}/>
                </div>
            </div>
            <div className="mb-3 row ">
                <label  className="col-sm-4 col-form-label fw-bold">Password:</label>
                <div className="col-sm-8">
                    <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" placeholder="Password" value={password}/>
                </div>
            </div>
            <p><button onClick={loginbutton} className="btn btn-success my-4">Login</button></p>
            <p className="d-inline mx-3">Don't have an account? </p> 
            <Link to="/register">Register Now</Link>
        </div>
  )
}


  
//   render() {
//     const { error, loading, token } = this.props;
//     const { username, password } = this.state;
//     if (token) {
//       return <Link to="/" />;
//     }

//     return (
//       <div className="reglog_container">
//         <h1 className="mb-5">Login</h1>
//         {/* <p className="error-text">{errorMessage ? errorMessage : ""}</p> */}
//         <form>
//           <div className="mb-3 row">
//             <label className="col-sm-4 col-form-label fw-bold">Email:</label>
//             <div className="col-sm-8 col-form-control">
//               <input
//               type="text"
//               name="email"
//               value={this.state.email}
//               // onChange={(e) => setEmail(e.target.value)}
//               className="form-control-plaintext"
//               placeholder="name@example.com"
//             />
//             </div> 
//           </div>
//           <div className="mb-3 row">
//             <label className="col-sm-4 col-form-label fw-bold">Password:</label>
//             <div className="col-sm-8 col-form-control">
//               <input 
//                 type="password"
//                 name="password"
//                 value={password}
//                 // onChange={(e) => setPassword(e.target.value)}
//                 className="form-control-plaintext"
//                 placeholder="Password"
//               />
//             </div>
//           </div>
//           <div className="center">
//             <button 
//               type="submit"
//               className="btn btn-primary"
//             >Sign In</button>
//           </div>
//         </form>
//       </div>
//     );
//     }
// }

export default Login;