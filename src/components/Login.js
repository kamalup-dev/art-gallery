import React, { useState } from "react";
import _ from "lodash";
import "../styles/login.css";
import supabase, { supabase_url } from "../data/supabase";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/store";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = async (event) => {
    event.preventDefault();
    const { email, password } = event.target;
    let error = null;

    if (_.isEmpty(email.value)) {
      error = "Please enter the email.";
    } else if (_.isEmpty(password.value)) {
      error = "Please enter the password.";
    }
    setErrorMsg(error);

    if (!error) {
        setLoading(true)
      try {
        const response = await supabase.auth.signInWithPassword({
          email: email.value,
          password: password.value,
        });
        if(response?.data?.user?.aud === "authenticated") {
            dispatch(loginUser(response?.data?.user))
            navigate("/art-gallery/upload", {replace: true})
        }
       
        console.log(response)
      } catch (error) {
        setErrorMsg("Something went wrong. Please try agian!");
        console.error("Error inserting data:", error.message);
      }
      setLoading(false)
    }
  };
  return (
    <section className="">
      <div className="container py-5 h-100 card-login">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={submitHandler}>
              {/* Email input */}

              <div className="form-outline text-left mb-4">
                <label className="form-label" htmlFor="form1Example13">
                  Email address:
                </label>
                <input
                  type="email"
                  id="form1Example13"
                  name="email"
                  className="form-control form-control-lg"
                />
              </div>
              {/* Password input */}
              <div className="form-outline text-left mb-4">
                <label className="form-label" htmlFor="form1Example23">
                  Password:
                </label>
                <input
                  type="password"
                  id="form1Example23"
                  name="password"
                  className="form-control form-control-lg"
                />
              </div>
              {/* <div className="d-flex justify-content-around align-items-center mb-4">
                
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="form1Example3"
                    defaultChecked=""
                  />
                  <label className="form-check-label" htmlFor="form1Example3">
                    {" "}
                    Remember me{" "}
                  </label>
                </div>
                <a href="#!">Forgot password?</a>
              </div> */}
              {/* Submit button */}
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                {loading ? "logging in...": "Sign In"}
              </button>
              {/* <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>
              <a
                className="btn btn-primary btn-lg btn-block"
                style={{ backgroundColor: "#3b5998" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-facebook-f me-2" />
                Continue with Facebook
              </a>
              <a
                className="btn btn-primary btn-lg btn-block"
                style={{ backgroundColor: "#55acee" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-twitter me-2" />
                Continue with Twitter
              </a> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
