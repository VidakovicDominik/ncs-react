import React from "react"
import ReactModal from "react-modal"
import "./customer.style.scss"
import { get, post } from "../../rest-client/rest-client"
import Bill from "../bill/bill.component"
import AddBill from "../add-bill/addBill.component"

class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: props.customer,
            bills: [],
            showBillsModal: false,
        };

        this.showBills = this.showBills.bind(this);
        this.editCustomer = this.editCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
        this.hideBills = this.hideBills.bind(this);
        this.getBills = this.getBills.bind(this);
    }

    componentDidMount() {
        this.getBills();
    }

    getBills() {
        get("customerBills/" + this.state.customer.Id).then(body => this.setState({ bills: body }));
    }

    showBills() {
        this.setState({ showBillsModal: true });
    }

    hideBills() {
        this.setState({ showBillsModal: false });
    }

    editCustomer() {
        this.getCustomers();
    }

    async deleteCustomer() {
        post("deletecustomer",JSON.stringify({Id: this.state.customer.Id}))
        .then(await new Promise(r => setTimeout(r, 400)))
        .then(this.props.refresh());
    }

    render() {
        return (
            <tr className="container">
                <td>{this.state.customer.Name}</td>
                <td>{this.state.customer.Surname}</td>
                <td>{this.state.customer.Email}</td>
                <td>{this.state.customer.Telephone}</td>
                <td><button onClick={this.showBills}>Bills</button></td>
                <td><button onClick={this.editCustomer}>Edit</button></td>
                <td><button onClick={this.deleteCustomer}>Delete</button></td>
                <ReactModal 
                    isOpen={this.state.showBillsModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.hideBills}
                    shouldCloseOnOverlayClick={true}>
                     {localStorage.getItem('token') && (<AddBill customerId={this.state.customer.Id} refresh={this.getBills}/>)}
                    <table>
                    <th>Date</th>
                    <th>Bill Number</th>
                    <th>Credit Card</th>
                    <th>Seller</th>
                    <th>Items</th>
                    <th>Delete</th>
                    {
                        this.state.bills.map(bill => (
                            <Bill key={bill.Id} bill={bill} refresh={this.getBills}/>
                        ))
                    }
                    </table>
                </ReactModal>
            </tr>
        );
    }
}

export default Customer;
