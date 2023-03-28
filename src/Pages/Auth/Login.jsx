import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/config";
import "./login.scss";
import Loader from "../../Components/Loader/Loader";
import { toast } from "react-toastify";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useSelector } from "react-redux";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { perviousUrl } = useSelector((state) => state.cart);

  // if user not log out redirect to login page
  const RedirectUser = () => {
    if (perviousUrl.includes("cart")) {
     
      return navigate("/cart");
    } else {
      return navigate("/");
    }
  };
  // Login  with email and password
  const LoginHandel = (e) => {
    setIsLoading(true);
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //const user = userCredential.user;
      
        setIsLoading(false);
        toast.success("Login Successful");
        RedirectUser();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  const provider = new GoogleAuthProvider();

  // Log in with google
  const LogInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("Login Successful");
        RedirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="login">
          <div className="loginContent">
            <div>
              <h1>Welcome!</h1>
              <p>Sign in to continue.</p>
            </div>

            <form onSubmit={LoginHandel}>
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Sign in</button>
              <Link to="/resetpassword">Forgot Passwod</Link>
            </form>
            <section>
              <span>
                {" "}
                <span></span> OR <span></span>
              </span>
              <button onClick={LogInWithGoogle}>
                <FcGoogle />
                Continue with Google
              </button>
            </section>
            <aside>
              <p>Don't have an account?</p>
              <Link to="/register">Register</Link>
            </aside>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
