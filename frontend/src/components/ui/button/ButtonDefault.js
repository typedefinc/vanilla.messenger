import '@assets/css/button.css';
import { useState } from "react";

const ButtonDefault = (props) => {
  const [isActive, setActive] = useState(false);

  const toggleClick = () => {
    if (!isActive) {
      setActive(true);
      setTimeout(() => {
        setActive(false);
      }, 400);
    }
  }

  return (
    <button className={`button-default ${isActive ? 'active' : ''}`} onClick={toggleClick}>
      {props.text}
    </button>
  )
}

export default ButtonDefault;