import React from "react"
import ReactModal from "react-modal"
import "./header.style.scss"
import Login from "../login/login.component"

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoginModal: false
        };

        this.showLogin = this.showLogin.bind(this);
        this.hideLogin = this.hideLogin.bind(this);
    }

    componentDidMount(){
    }

    showLogin() {
        this.setState({ showLoginModal: true });
        localStorage.clear();
    }

    hideLogin() {
        this.setState({ showLoginModal: false });
    }



    render() {
        return (
            <div className="container">
            <h1>Adventure works</h1>
                {
                    localStorage.getItem('token') ? (<button class="ll input" onClick={this.showLogin}>Logout</button>) : (<button class="ll input" onClick={this.showLogin}>Login</button>)
                }
                <ReactModal className="modal"
                    isOpen={this.state.showLoginModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.hideLogin}
                    shouldCloseOnOverlayClick={true}>
                    <Login updateUser={this.props.updateUser}/>
                </ReactModal>
            </div>
        );
    }
}

export default Header;
