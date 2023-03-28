import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/config";
import Loader from "../../Components/Loader/Loader";
import "./register.scss";
import { toast } from "react-toastify";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate("/login");

  // register with new user
  const RegisterHandel = (e) => {
    setIsLoading(true);
    e.preventDefault();
    // Pasword Check
    if (password !== confirmPassword) {
      toast.error("password do not match");
      setIsLoading(false);
    } else {
      // Create User with email and passowrd
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // const user = userCredential.user;
          // console.log(user);
          toast.success("Registration Successful");
          setIsLoading(false);
          navigate("/login");
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error.message);
        });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="register">
          <div className="registerContent">
            <div>
              <h1>Welcome!</h1>
              <p>Sign up to continue.</p>
            </div>

            <form onSubmit={RegisterHandel}>
              <input
                type="email"
                placeholder="Enter your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter your password"
                min={6}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter your confirm password"
                min={6}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit">Sign up</button>
            </form>

            <aside>
              <p>Alreday an account?</p>
              <Link to="/login">Login</Link>
            </aside>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
