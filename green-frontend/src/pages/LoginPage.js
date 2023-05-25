import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function Auth(props) {

  const [Users, setUsers] = useState([]);

  useEffect(() => {
    //console.log("setUser on progress..");
    loadUsers();
  }, [1]);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/getPassword");
    setUsers(result.data);
    console.log(result.data);
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button onClick="onSubmit()" type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>

  )
}

function onSubmit() {

}