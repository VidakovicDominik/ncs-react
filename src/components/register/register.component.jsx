import React from "react"
import "./register.style.scss"
import { get, post } from "../../rest-client/rest-client"


class Register extends React.Component {
    constructor() {
        super();
        this.state = {
        };

        this.register=this.register.bind(this);
    }

    register(){
        
    }

    render() {
        return (
            <div>
                <input type="text"></input>
                <input type="password"></input>
                <button onClick={this.register}>Register</button>
        
            </div>
        );
    }
}

export default Register;
