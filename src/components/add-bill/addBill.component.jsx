import React from "react"
import "./addBill.style.scss"
import { get, post } from "../../rest-client/rest-client"
import axios from "axios"

class AddBill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "Date": "2019-01-01",
            "BillNumber": "",
            "CustomerId": 101,
            "SellerId": 276,
            "CreditCardId": 9458,
            "Comment": ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onSubmit(event) {
        event.preventDefault();
        axios.post("http://www.fulek.com/nks/api/aw/addcustomer",
            this.state,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }).then(response => { console.log(response.data) }).catch(error => console.log(error));
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }


    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <label>BillNumber</label>
                <input type="text" name="BillNumber" value={this.state.name} onChange={this.handleChange}></input>
                <label>Comment</label>
                <input type="text" name="Comment" value={this.state.name} onChange={this.handleChange}></input>
                <label>Customer</label>
                <label>Seller</label>
                <label>CreditCard</label>
                <input type="submit" value="Add"></input>
            </form>
        );
    }
}

export default AddCustomer;
