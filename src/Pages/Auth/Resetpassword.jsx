import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Firebase/config";
import Loader from "../../Components/Loader/Loader";
import "./resetpassword.scss";
function Resetpassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState("");

  // Reset passowrd
  const ResetPasswordHandel = (e) => {
    setIsLoading(true);
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success("Check your email, reset password link send your email");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="resetPassword">
          <div className="resetPasswordContent">
            <div>
              <h1>Reset Password</h1>
              <p>Reset password to continue.</p>
            </div>

            <form onSubmit={ResetPasswordHandel}>
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Reset Password</button>
            </form>
            <aside>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </aside>
          </div>
        </div>
      )}
    </>
  );
}

export default Resetpassword;
