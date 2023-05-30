import { useState } from "react";
const useValid = (validate) => {
  const [enterValue, setEnterValue] = useState("");
  const [valueIsTouched, setValueIsTouched] = useState(false);

  const valueIsValid = validate(enterValue);
  const valueInputIsInvalid = !valueIsValid && valueIsTouched;
  const valueInputChangeHandler = (event) => {
    setEnterValue(event.target.value);
  };
  const valueInputBlurHandler = () => {
    setValueIsTouched(true);
  };
  const reset = () => {
    setEnterValue("");
    setValueIsTouched(false);
  };
  return {
    value: enterValue,
    hasError: valueInputIsInvalid,
    isValid: valueIsValid,
    reset,
    valueInputBlurHandler,
    valueInputChangeHandler,
  };
};
export default useValid;
