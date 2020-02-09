import React from 'react';
import './container.style.scss';
import {customerTemplate} from "../../template"
import Customer from "../customer/customer.component"
import {get} from "../../rest-client/rest-client"

class Container extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:props.title,
            customers:customerTemplate
        };
    }

    componentDidMount(){
        get("customers").then(body=>this.setState({customers:body}));
    }

    render(){
        return (
            <table>
            {
                this.state.customers.map(customer=>(
                    <Customer key={customer.Id} customer={customer}/>
                ))
            }
            </table>
        )
    }

}

export default Container;