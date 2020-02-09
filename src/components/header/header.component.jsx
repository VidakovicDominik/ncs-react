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
    }

    hideLogin() {
        this.setState({ showLoginModal: false });
    }

    render() {
        return (
            <div className="container">
            <h1>Adventure works</h1>
                {
                    this.props.user ? (<button onClick={this.showLogin}>Logout</button>) : (<button onClick={this.showLogin}>Login</button>)
                }
                <ReactModal
                    isOpen={this.state.showLoginModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.hideLogin}
                    shouldCloseOnOverlayClick={true}>
                    <Login/>
                    <button onClick={this.hideLogin}>Close Modal</button>
                </ReactModal>
            </div>
        );
    }
}

export default Header;
