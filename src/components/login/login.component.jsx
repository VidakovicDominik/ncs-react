import React from "react"
import ReactModal from "react-modal"
import "./login.style.scss"
import { login } from "../../rest-client/rest-client"
import Register from "../register/register.component"


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showRegisterModal: false,
            username: '',
            password: ''
        };

        this.showRegister = this.showRegister.bind(this);
        this.hideRegister = this.hideRegister.bind(this);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    login() {
        console.log(localStorage.getItem('token'));
        login(JSON.stringify(this.state))
            .then(this.setState({ loginSuccess: true }))
            .then(body => {
                localStorage.setItem('token', body.token);
                this.props.updateUser(body.username);
            }).catch(error => localStorage.clear());

    }

    showRegister() {
        this.setState({ showRegisterModal: true })
    }

    hideRegister() {
        this.setState({ showRegisterModal: false })
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
                <div className="login-container">
                    <h2>Login</h2>
                    <input className="login-input" placeholder="Username" type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>
                    <input className="login-input" placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                    <button className="login-submit" onClick={this.login}>Login</button>
                    <button className="login-submit" onClick={this.showRegister}>Register</button>
                    <ReactModal className="register-modal"
                        isOpen={this.state.showRegisterModal}
                        contentLabel="onRequestClose Example"
                        onRequestClose={this.hideRegister}
                        shouldCloseOnOverlayClick={true}>
                        <Register />
                    </ReactModal>
                    {this.state.loginSuccess ? <label>Successfully logged in</label> : ''}
                </div>
        );
    }
}

export default Login;
