import React from "react"
import "./item.style.scss"
import {get, post} from "../../rest-client/rest-client"

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item
        };

        this.deleteItem=this.deleteItem.bind(this);
    }

    deleteItem(){

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
