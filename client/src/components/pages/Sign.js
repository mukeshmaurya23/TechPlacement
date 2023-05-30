import React from "react";
import styles from "./Sign.module.css";
import NormalCard from "../../UI/NormalCard";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import useValid from "../../hooks/useValid";
const Sign = () => {
  const navigate = useNavigate();
  const loginHandler = () => {
    navigate("/admin/data");
  };
  const {
    value: enteredPassword,
    hasError: passwordInputIsInvalid,
    isValid: passwordIsValid,
    valueInputChangeHandler: passwordInputChangeHandler,
    valueInputBlurHandler: passwordInputBlurHandler,
    reset: passwordReset,
  } = useValid((value) => value.length > 6);
  const {
    value: enteredEmail,
    hasError: emailInputIsInvalid,
    isValid: emailIsValid,
    valueInputChangeHandler: emailInputChangeHandler,
    valueInputBlurHandler: emailInputBlurHandler,
    reset: emailReset,
  } = useValid((value) => value.includes("@"));

  let FormISValid = false;
  if (passwordIsValid && emailIsValid) {
    FormISValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!passwordIsValid && !emailIsValid) {
      return;
    }
    emailReset();
    passwordReset();
  };
  const passwordInputclass = passwordInputIsInvalid
    ? `${styles["invalid"]}`
    : `${styles["control"]}`;
  const emailInputClass = emailInputIsInvalid
    ? `${styles.invalid}`
    : `${styles.control}`;
  return (
    <>
      <NormalCard>
        <form className={styles.form} onSubmit={formSubmitHandler}>
          <h1 className="mt-5">Only Admin Can Sign in Here!!</h1>

          <div className={emailInputClass}>
            <label htmlFor="title">Email Address</label>
            <input
              type="email"
              id="email"
              value={enteredEmail}
              onChange={emailInputChangeHandler}
              onBlur={emailInputBlurHandler}
            />
          </div>
          {emailInputIsInvalid && (
            <p className={styles["error-text"]}>Enter valid Email</p>
          )}
          <div className={passwordInputclass}>
            <label htmlFor="title">Password</label>
            <input
              type="password"
              id="password"
              value={enteredPassword}
              onChange={passwordInputChangeHandler}
              onBlur={passwordInputBlurHandler}
            />
          </div>
          {passwordInputIsInvalid && (
            <p className={styles["error-text"]}>Enter valid Password</p>
          )}
          <div className={styles.actions}>
            <button disabled={!FormISValid} onClick={loginHandler}>
              Submit
            </button>
          </div>
        </form>
      </NormalCard>
      <Footer />
    </>
  );
};

export default Sign;
