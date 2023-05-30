import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { toast } from "react-toastify";
import Spinner from "../../UI/Spinner";
import main from "../../images/main.svg";
import { AuthContext } from "../store/auth-login";
import logo from "../../images/logo.png";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import Footer from "../Footer/Footer";
import { AUTH, GOOGLE_LOGIN } from "../../constant";
//import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useContext(AuthContext);
  console.log(state);
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showloginButton, setShowloginButton] = useState(true);
  // const [showlogoutButton, setShowlogoutButton] = useState(false);
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "617486206171-im3u11o29us070jhadntud7pk4qbjqi7.apps.googleusercontent.com",
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const responseGoogleSuccess = async (response) => {
    try {
      const result = await axios.post(GOOGLE_LOGIN, {
        tokenId: response.tokenId,
      });
      console.log(result);
      if (result) {
        localStorage.setItem("token", JSON.stringify(result.data.token));
        localStorage.setItem("user", JSON.stringify(result.data.user));

        setState({
          user: result.data.user.email,
          token: result.data.token,
        });
        //alert(result.data.user.email);
        toast.success("Login Successfull");
        //navigate("/dashboard");
        window.location.href = "/";
      }
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
  const responseGoogleFailure = (response) => {
    console.log(response);
  };

  //   const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: res } = await axios.post(AUTH, data);
      setLoading(false);

      toast.success("Successfully logged in");
      setState({
        user: res.user,
        token: res.token,
      });

      localStorage.setItem("token", JSON.stringify(res.data));

      console.log("sucesss", res.data);
      window.location.href = "/";
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
              src={main}
              alt="main"
              style={{
                cursor: "pointer",
              }}
              className="img-fluid "
            />
          </div>
          <div className="col-md-6 contents p-2">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="mb-4 ">
                  {/* <img src={logo} alt="logo" className={styles.logo} /> */}
                  <p className="display-6">
                    <span className={styles.spanHeading}>Tech </span>
                    <span className={styles.spanHeadingtwo}>Placement</span>
                    <img src={logo} alt="logo" className={styles.logo} />
                  </p>

                  <p class="mb-4">
                    Welcome to TechPlacement - the online platform for students
                    to get placed in companies.
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className={styles.GoogleButton}>
                    <GoogleLogin
                      clientId="617486206171-im3u11o29us070jhadntud7pk4qbjqi7.apps.googleusercontent.com"
                      buttonText="Login With Google"
                      onSuccess={responseGoogleSuccess}
                      onFailure={responseGoogleFailure}
                      cookiePolicy={"single_host_origin"}
                    />
                  </div>
                  <div class="form-group first">
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                      value={data.email}
                      className={styles.input}
                    />
                  </div>
                  <div class="form-group last mb-4">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                      value={data.password}
                      className={styles.input}
                    />
                  </div>
                  <button type="submit" className={styles.green_btn}>
                    {loading ? <Spinner /> : "Login"}
                  </button>

                  <div class="d-flex align-items-center">
                    <span class="ml-auto">
                      <Link
                        to="/forgot-password"
                        style={{
                          alignSelf: "flex-start",
                          textDecoration: "none",
                        }}
                      >
                        <p
                          style={{ padding: "5px" }}
                          className={styles.forgot_pass}
                        >
                          Forgot Password
                        </p>
                      </Link>
                    </span>
                  </div>
                  {error && <div className={styles.error_msg}>{error}</div>}
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
                  <Link to="/signup">
                    <p>
                      New User ?
                      <span
                        style={{
                          color: "#111111",
                          fontWeight: "bold",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                      >
                        Create an Account
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

export default Login;
