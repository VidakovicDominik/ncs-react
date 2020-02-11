import React from "react"
import ReactModal from "react-modal"
import "./bill.style.scss"
import { get, post } from "../../rest-client/rest-client"
import Item from "../item/item.component"
import AddItem from "../add-item/addItem.component"
import Axios from "axios"


class Bill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bill: props.bill,
            items: [],
            showItemsModal: false
        };

        this.showItems = this.showItems.bind(this);
        this.deleteBill = this.deleteBill.bind(this);
        this.hideItems = this.hideItems.bind(this);
        this.getItems = this.getItems.bind(this);
    }

    componentDidMount() {
        this.getItems();
    }

    getItems() {
        get("billitems/" + this.state.bill.Id).then(body => this.setState({ items: body }));
    }


    showItems() {
        this.setState({ showItemsModal: true });
    }

    hideItems() {
        this.getItems();
        this.setState({ showItemsModal: false });
    }

    async deleteBill() {
        Axios.post('http://www.fulek.com/nks/api/aw/deleteBill',
            { id: this.state.bill.Id },
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
                <td>{this.state.bill.Date}</td>
                <td>{this.state.bill.BillNumber}</td>
                <td>{this.state.bill.CreditCard.Type}</td>
                <td>{this.state.bill.Seller.Name + " " + this.state.bill.Seller.Surname}</td>
                <td><button onClick={this.showItems}>Items</button></td>
                {localStorage.getItem('token') && (<td><button onClick={this.deleteBill}>Delete</button></td>)}
                <ReactModal
                    isOpen={this.state.showItemsModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.hideItems}
                    shouldCloseOnOverlayClick={true}>
                    {localStorage.getItem('token') && (<AddItem refresh={this.getItems} billId={this.state.bill.Id} />)}
                    <table>
                        <th>Quantity</th>
                        <th>Full price</th>
                        <th>Product price</th>
                        <th>Name</th>
                        {localStorage.getItem('token') && (<th>Delete</th>)}
                        {
                            this.state.items.map(item => (
                                <Item key={item.Id} item={item} refresh={this.getItems} />
                            ))
                        }
                    </table>
                </ReactModal>
            </tr>
        );
    }
}

export default Bill;
