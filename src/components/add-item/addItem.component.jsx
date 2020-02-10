import React from "react"
import "./addItem.style.scss"
import { get, post } from "../../rest-client/rest-client"
import axios from "axios"

class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "BillId":"75125",
            "ProductId": "777",
            "Quantity":""
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
                <label>Name</label>
                <input type="text" name="Name" value={this.state.name} onChange={this.handleChange}></input>
                <label>Surname</label>
                <input type="text" name="Surname" value={this.state.name} onChange={this.handleChange}></input>
                <label>Email</label>
                <input type="text" name="Email" value={this.state.name} onChange={this.handleChange}></input>
                <label>Telephone</label>
                <input type="text" name="Telephone" value={this.state.name} onChange={this.handleChange}></input>
                <input type="submit" value="Add"></input>
            </form>
        );
    }
}

export default AddItem;
