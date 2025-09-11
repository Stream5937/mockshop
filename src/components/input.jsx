import { useState } from "react";
import style from "../styles/input.module.css";

function MyInputForm(props) {
  const [quantity, setQuantity] = useState(0);

  const isFormValid = () => {
    return quantity.length;
  };

  const handleQuantityChange = (e) => {
    e.preventDefault();
    setQuantity(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const formData = {
      number: quantity,
    };
    //props obj is saveInputValue: saveInputValuEdu
    props.saveInputValue(formData);
  };

  return (
    <form onSubmit={onSubmitForm}>
      <label htmlFor="quantity">Number of items req'd.:</label>
      <input
        style={style.input}
        type="number"
        id="quantity"
        name="quantity"
        placeholder="number to buy"
      />
      <br />
      <br />
      {/* <input type="submit" value="Submit"/> */}
    </form>
  );
}

export default MyInputForm;
