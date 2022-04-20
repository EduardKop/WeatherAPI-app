import React from "react";

function Button ({triger}) {
    return (
        <div className="weather-button-wrap">
        <button 
        className="weather-button"
        onClick={triger}
        >Search</button>
        </div>
    )
}

export default Button