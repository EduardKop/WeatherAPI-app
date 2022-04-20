import React from "react";

function Input({value,change}) {
    return (
      <>
        <input
        type='text'
        className="weather-input-elem"
        placeholder="Введіть місто"
        value={value}
        onChange={change}
        />
       </>
    )
}

export default Input