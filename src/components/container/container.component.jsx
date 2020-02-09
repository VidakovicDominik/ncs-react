import React from 'react';
import './container.style.scss';
import { customerTemplate } from "../../template"
import Customer from "../customer/customer.component"
import Header from "../header/header.component"
import { get } from "../../rest-client/rest-client"

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            title: props.title,
            customers: customerTemplate
        };
    }

    componentDidMount() {
        get("customers").then(body => this.setState({ customers: body }));
    }

    render() {
        return (
            <div>
            <Header user={this.state.currentUser}/>
                <table>
                    {
                        this.state.customers.map(customer => (
                            <Customer key={customer.Id} customer={customer} />
                        ))
                    }
                </table>
            </div>
        )
    }

}

export default Container;