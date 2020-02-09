import React from "react"
import ReactModal from "react-modal"
import "./bill.style.scss"
import {get, post} from "../../rest-client/rest-client"

class Bill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bill: props.bill,
            showItemsModal: false
        };

        this.showItems=this.showItems.bind(this);
        this.deleteBill=this.deleteBill.bind(this);
        this.hideItems=this.hideItems.bind(this);
    }

    showItems(){
        this.setState({showItemsModal: true});
    }

    hideItems(){
        this.setState({showItemsModal: false});
    }


    deleteBill(){

    }

    render() {
        return (
            <tr className="container">
                <td>{this.state.bill.Date}</td>
                <td>{this.state.bill.BillNumber}</td>
                <td>{this.state.bill.CreditCard.Type}</td>
                <td>{this.state.bill.Seller.Name+" "+this.state.bill.Seller.Surname}</td>
                <td><button onClick={this.showItems}>Items</button></td>
                <td><button onClick={this.deleteBill}>Delete</button></td>
                <ReactModal 
                isOpen={this.state.showItemsModal}
                contentLabel="onRequestClose Example"
                onRequestClose={this.hideItems}
                shouldCloseOnOverlayClick={true}>
               <p>Modal text!</p>
               <button onClick={this.hideItems}>Close Modal</button>
             </ReactModal>
            </tr>
        );
    }
}

export default Bill;
