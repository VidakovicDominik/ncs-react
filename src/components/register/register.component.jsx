import React from "react"
import "./register.style.scss"
import { register } from "../../rest-client/rest-client"


class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            username: '',
            password: '',
            img: ''
        };

        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    register(event) {
        event.preventDefault();

        console.log(JSON.stringify(this.state));
        register(JSON.stringify(this.state))
        .then(this.setState({lastRegistrationSuccess: true, lastRegistrationFail: null}));
    
    }

    handleResponse(response){
        if(!response.ok){
            this.setState({lastRegistrationSuccess: null, lastRegistrationFail: "Registration unsuccessful"});
        }
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
            <div className="register-container">
                <h2>Register</h2>
                <form onSubmit={this.register}>
                    <input className="register-input" placeholder="Name" type="text" name="name" value={this.state.name} onChange={this.handleChange}></input>
                    <input className="register-input" placeholder="Username" type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>
                    <input className="register-input" placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                    <input className="register-submit" type="submit" value="Register"/>
                </form>
                {this.state.lastRegistrationSuccess ? <label>Successfully registered</label>: ''}
                {this.state.lastRegistrationFail ? <label>{this.state.lastRegistrationFail}</label>: ''}
            </div>
        );
    }
}

export default Register;
