import React from "react"
import "./item.style.scss"
import {get, post} from "../../rest-client/rest-client"
import Axios from "axios"

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item
        };

        this.deleteItem=this.deleteItem.bind(this);
    }

    async deleteItem() {
        Axios.post('http://www.fulek.com/nks/api/aw/deleteItem',
            { id: this.state.item.Id },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }).then(response => { console.log(response.data) })
            .then(await new Promise(r => setTimeout(r, 400)))
            .then(this.props.refresh())
            .catch(error => console.log(error));
    }

    render() {
        return (
            <tr className="container">
                <td>{this.state.item.Quantity}</td>
                <td>{this.state.item.TotalPrice}</td>
                <td>{this.state.item.PricePerPiece}</td>
                <td>{this.state.item.Product.Name}</td>
                <td><button onClick={this.deleteItem}>Delete</button></td>
            </tr>
        );
    }
}

export default Item;
