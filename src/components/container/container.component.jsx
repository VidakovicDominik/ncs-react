import React from 'react';
import './container.style.scss';
import Customer from "../customer/customer.component"
import Header from "../header/header.component"
import { get } from "../../rest-client/rest-client"

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            title: props.title,
            customers: []
        };

        this.getCustomers=this.getCustomers.bind(this);
    }

    componentDidMount() {
        this.getCustomers();
    }

    getCustomers(){
        get("customers").then(res=>res.json()).then(body => this.setState({ customers: body }));
    }

    render() {
        return (
            <div>
            <Header user={this.state.currentUser}/>
                <table>
                    {
                        this.state.customers.map(customer => (
                            <Customer key={customer.Id} customer={customer} refresh={this.getCustomers} />
                        ))
                    }
                </table>
            </div>
        )
    }

}

export default Container;