import React from "react"
import "./customer.style.scss"

export const Customer = (props) => {
    return (
        <div className="container">
            <h2>{props.customer.Name}</h2>
            <h2>{props.customer.Surname}</h2>
            <h2>{props.customer.Email}</h2>
            <h2>{props.customer.Telephone}</h2>
        </div>
    );
}