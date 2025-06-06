import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

import "./Login.css";

const UserLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setLoginRequest({ ...loginRequest, [name]: value });

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    let errors = {};
    if (!loginRequest.emailId) {
      errors.emailId = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginRequest.emailId)) {
      errors.emailId = "Email is invalid";
    }
    if (!loginRequest.password) {
      errors.password = "Password is required";
    }
    if (!loginRequest.role) {
      errors.role = "Role is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const loginAction = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    }).then((result) => {
      console.log("result", result);
      result.json().then((res) => {
        console.log(res);

        if (res.role === "Admin") {
          sessionStorage.setItem("active-admin", JSON.stringify(res));
        } else if (res.role === "Customer") {
          sessionStorage.setItem("active-customer", JSON.stringify(res));
        } else if (res.role === "Hotel") {
          sessionStorage.setItem("active-hotel", JSON.stringify(res));
        }

        toast.success("Logged in successfully!!!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        navigate("/home");
        window.location.reload(true);
      });
    });
  };

  return (
    <div className="bg-image">
      <div className="login-container glass">
        <div className="login-center">
          <h2>Login Here!</h2>
          <p>Please enter your credentials</p>
          <form onSubmit={loginAction}>
            <input
              className="login-email"
              type="email"
              placeholder="Email"
              id="emailId"
              name="emailId"
              onChange={handleUserInput}
              value={loginRequest.emailId}
            />
            {errors.emailId && <div className="error">{errors.emailId}</div>}
            <div className="pass-input-div">
              <input
                className="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                name="password"
                onChange={handleUserInput}
                value={loginRequest.password}
                autoComplete="on"
              />
              {showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
              ) : (
                <FaEye onClick={() => setShowPassword(!showPassword)} />
              )}
              {errors.password && <div className="error">{errors.password}</div>}
            </div>

            <div className="gender-div">
              <select onChange={handleUserInput} name="role" value={loginRequest.role}>
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Customer">Customer</option>
                <option value="Hotel">Manager</option>
              </select>
              {errors.role && <div className="error">{errors.role}</div>}
            </div>

            <div className="login-center-buttons button-31">
              <button type="submit">Log In</button>
            </div>
            <ToastContainer />
          </form>
        </div>

        <p className="login-bottom-p">
          Don't have an account? <Link to={"/user/customer/register"}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default UserLoginForm;
