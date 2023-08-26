import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate=useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geoLocation: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geoLocation,
      })
    );
    const response = await fetch("http://localhost:3000/api/newuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //properties should be same as declared in backend schema.
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geoLocation,
      }),
    });
    const json = await response.json();
    console.log(json);
    navigate('/login');
    if (!json.success) {
      alert("Enter valid credentials, Try Again!!");
    }
  };
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
        <div className="sign-in-up"><h2>SIGN UP</h2></div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={credentials.name}
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="signUpInputEmail" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="signUpInputEmail"
              name="email"
              value={credentials.email}
              aria-describedby="emailHelp"
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="geoLocation"
              value={credentials.geoLocation}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a User
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
