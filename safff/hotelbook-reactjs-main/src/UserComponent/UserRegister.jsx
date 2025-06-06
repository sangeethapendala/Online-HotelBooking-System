import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import "./Signup.css";

const UserRegister = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
    state: "",
    city: "",
    pincode: "",
    role: "",
    sex: "",
  });

  const [errors, setErrors] = useState({});

  if (document.URL.indexOf("admin") !== -1) {
    user.role = "Admin";
  } else if (document.URL.indexOf("hotel") !== -1) {
    user.role = "Hotel";
  } else if (document.URL.indexOf("customer") !== -1) {
    user.role = "Customer";
  }

  console.log("ROLE FETCHED : " + user.role);

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    let errors = {};
    if (!user.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!user.lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!user.emailId) {
      errors.emailId = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.emailId)) {
      errors.emailId = "Email is invalid";
    }
    if (!user.password) {
      errors.password = "Password is required";
    } else if (user.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!user.contact) {
      errors.contact = "Contact Number is required";
    } else if (!/^\d{10}$/.test(user.contact)) {
      errors.contact = "Contact Number is invalid";
    }
    if (!user.city) {
      errors.city = "City is required";
    }
    if (!user.state) {
      errors.state = "State is required";
    }
    if (!user.pincode) {
      errors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(user.pincode)) {
      errors.pincode = "Pincode is invalid";
    }
    if (!user.sex) {
      errors.sex = "Gender is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const [genders, setGenders] = useState([]);

  const retrieveAllGenders = async () => {
    const response = await axios.get("http://localhost:8080/api/user/gender");
    return response.data;
  };

  useEffect(() => {
    const getAllGenders = async () => {
      const allGenders = await retrieveAllGenders();
      if (allGenders) {
        setGenders(allGenders.genders);
      }
    };

    getAllGenders();
  }, []);

  const saveUser = (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((result) => {
      toast.success("Registered Successfully!!!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      result
        .json()
        .then((res) => {
          console.log("response", res);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <div className="register-main">
      <div className="register bg-image ">
        <div className="register-container glass">
          <div className="register-center">
            <h2>SignUp Here!</h2>
            <form onSubmit={saveUser}>
              <div className="register-input-div flex-inputs">
                <div className="column">
                  <input
                    type="text"
                    placeholder="First Name"
                    style={{ width: "100%" }}
                    id="firstName"
                    name="firstName"
                    onChange={handleUserInput}
                    value={user.firstName} />
                  {errors.firstName && <div className="error">{errors.firstName}</div>}
                </div>
                <div className="column">
                  <input
                    type="text"
                    placeholder="Last Name"
                    style={{ width: "100%" }}
                    id="lastName"
                    name="lastName"
                    onChange={handleUserInput}
                    value={user.lastName} />
                  {errors.lastName && <div className="error">{errors.lastName}</div>}
                </div>
              </div>

              <div className="register-input-div">
                <input
                  type="email"
                  placeholder="Email"
                  id="emailId"
                  name="emailId"
                  onChange={handleUserInput}
                  value={user.emailId} />
                {errors.emailId && <div className="error">{errors.emailId}</div>}
              </div>

              <div className="signup-pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  name="password"
                  onChange={handleUserInput}
                  value={user.password} />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
                {errors.password && <div className="error">{errors.password}</div>}
              </div>

              <div className="input-div">
                <input
                  type="number"
                  placeholder="Contact Number"
                  id="contact"
                  name="contact"
                  onChange={handleUserInput}
                  value={user.contact} />
                {errors.contact && <div className="error">{errors.contact}</div>}
              </div>

              <div className="register-input-div flex-inputs">
                <div className="column">
                  <select
                    onChange={handleUserInput}
                    name="sex"
                    value={user.sex}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.sex && <div className="error">{errors.sex}</div>}
                </div>
                <div className="column">
                  <input
                    type="text"
                    placeholder="City"
                    id="city"
                    name="city"
                    onChange={handleUserInput}
                    value={user.city} />
                  {errors.city && <div className="error">{errors.city}</div>}
                </div>
              </div>

              <div className="register-input-div flex-inputs">
                <div className="column">
                  <input
                    type="text"
                    placeholder="State"
                    id="state"
                    name="state"
                    onChange={handleUserInput}
                    value={user.state} />
                  {errors.state && <div className="error">{errors.state}</div>}
                </div>
                <div className="column">
                  <input
                    type="number"
                    placeholder="Pincode"
                    id="pincode"
                    name="pincode"
                    onChange={handleUserInput}
                    value={user.pincode} />
                  {errors.pincode && <div className="error">{errors.pincode}</div>}
                </div>
              </div>

              <div className="register-center-buttons">
                <button type="submit" value="Register User">
                  Sign Up
                </button>
              </div>
              <ToastContainer></ToastContainer>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
