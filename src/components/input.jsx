import { useState } from "react";
import style from "../styles/input.module.css";

function MyInputForm(props) {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (e) => {
    e.preventDefault();
    setQuantity(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const formData = {
      number: quantity,
    };
    props.saveInputValue(formData); //SAVED  / USED WHERE ?? NEEDED ??
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
    </form>
  );
}

export default MyInputForm;
