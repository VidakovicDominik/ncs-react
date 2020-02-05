import React from 'react';
import './container.style.scss';
import {template} from "../../template"
import {Customer} from "../customer/customer.component"

class Container extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:props.title,
            customers:template
        };
    }

    componentDidMount(){
        fetch("http://www.fulek.com/nks/api/aw/customers")
        .then(res=>res.json())
        .then(body=>this.setState({
            customers:body
        }));
    }

    render(){
        return (
            <div>
            {
                this.state.customers.map(customer=>(
                    <Customer key={customer.Id} customer={customer}/>
                ))
            }
            </div>
        )
    }

}

export default Container;