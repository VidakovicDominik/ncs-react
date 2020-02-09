import React from "react"
import ReactModal from "react-modal"
import "./bill.style.scss"
import { get, post } from "../../rest-client/rest-client"
import { itemTemplate } from "../../template"
import Item from "../item/item.component"


class Bill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bill: props.bill,
            items: itemTemplate,
            showItemsModal: false
        };

        this.showItems = this.showItems.bind(this);
        this.deleteBill = this.deleteBill.bind(this);
        this.hideItems = this.hideItems.bind(this);
    }

    componentDidMount(){
        this.getItems();
    }

    getItems(){
        get("billitems/"+this.state.bill.Id).then(body=>this.setState({items:body}));

    }

    showItems() {
        this.setState({ showItemsModal: true });
    }

    hideItems() {
        this.getItems();
        this.setState({ showItemsModal: false });
    }

    deleteBill() {

    }

    render() {
        return (
            <tr className="container">
                <td>{this.state.bill.Date}</td>
                <td>{this.state.bill.BillNumber}</td>
                <td>{this.state.bill.CreditCard.Type}</td>
                <td>{this.state.bill.Seller.Name + " " + this.state.bill.Seller.Surname}</td>
                <td><button onClick={this.showItems}>Items</button></td>
                <td><button onClick={this.deleteBill}>Delete</button></td>
                <ReactModal
                    isOpen={this.state.showItemsModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.hideItems}
                    shouldCloseOnOverlayClick={true}>
                    <table>
                    {
                        this.state.items.map(item => (
                            <Item key={item.Id} item={item} />
                        ))
                    }
                    </table>
                    <button onClick={this.hideItems}>Close Modal</button>
                </ReactModal>
            </tr>
        );
    }
}

export default Bill;
