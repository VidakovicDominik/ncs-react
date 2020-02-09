import React from "react"
import ReactModal from "react-modal"
import "./login.style.scss"
import { get, post } from "../../rest-client/rest-client"
import Register from "../register/register.component"


class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            showRegisterModal: false
        };

        this.showRegister = this.showRegister.bind(this);
        this.hideRegister = this.hideRegister.bind(this);
        this.login=this.login.bind(this);
    }

    login(){
        
    }

    showRegister(){
        this.setState({showRegisterModal: true})
    }

    hideRegister(){
        this.setState({showRegisterModal: false})
    }

    render() {
        return (
            <div>
                <input type="text"></input>
                <input type="password"></input>
                <button onClick={this.login}>Login</button>
                <button onClick={this.showRegister}>Register</button>
                <ReactModal
                    isOpen={this.state.showRegisterModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.hideRegister}
                    shouldCloseOnOverlayClick={true}>
                    <Register/>
                    <button onClick={this.hideRegister}>Close Modal</button>
                </ReactModal>
            </div>
        );
    }
}

export default Login;
