import { useState } from "react";
import axios from "axios";
import Spinner from "../../UI/Spinner";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { toast } from "react-toastify";
import demo from "../../images/demo.svg";
import Footer from "../Footer/Footer";
import logo from "../../images/logo.png";
import { USERS } from "../../constant";
const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: res } = await axios.post(USERS, data);
      setMsg(res.message);
      setLoading(false);
      toast.success("Successfully signed up");
      //alert("You have successfully signed up");
      console.log("sucesss");
      navigate("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setLoading(false);
      }
    }
  };

  return (
    <div class="content">
      <div class="container p-5">
        <div class="row">
          <div class="col-md-6 order-md-2">
            <img
              src={demo}
              style={{
                cursor: "pointer",
              }}
              alt="sidebar"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6 contents p-2">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="mb-4 ">
                  <p className="display-6">
                    <span className={styles.spanHeading}>Tech </span>
                    <span className={styles.spanHeadingtwo}>Placement</span>
                    <img src={logo} alt="logo" className={styles.logo} />
                  </p>

                  <p class="mb-4">
                    Find out what you like doing best, and get someone to pay
                    you for doing it.
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div class="form-group first">
                    <input
                      type="text"
                      placeholder="Full Name"
                      name="firstName"
                      onChange={handleChange}
                      value={data.firstName}
                      className={styles.input}
                    />

                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                      value={data.email}
                      className={styles.input}
                    />

                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                      value={data.password}
                      className={styles.input}
                    />
                  </div>

                  {error && <div className={styles.error_msg}>{error}</div>}

                  <button type="submit" className={styles.green_btn}>
                    {loading ? <Spinner /> : "Sign Up"}
                  </button>
                </form>
                <div class="d-flex align-items-center">
                  <span class="border-bottom w-100 ml-5"></span>
                  <span
                    class="px-2 small
                    text-muted font-weight-bold text-muted"
                  >
                    OR
                  </span>
                  <span class="border-bottom w-100 mr-5"></span>
                </div>
                <div className={styles.right}>
                  <Link to="/login">
                    <p>
                      Already Have an Account ?{" "}
                      <span
                        style={{
                          color: "#111",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        Login In
                      </span>
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
