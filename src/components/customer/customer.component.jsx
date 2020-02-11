import React from "react"
import ReactModal from "react-modal"
import "./customer.style.scss"
import { get, post } from "../../rest-client/rest-client"
import Bill from "../bill/bill.component"
import AddBill from "../add-bill/addBill.component"
import EditCustomer from "../edit-customer/editCustomer.component"

class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: props.customer,
            bills: [],
            showBillsModal: false,
            showEditModal: false
        };

        this.showBills = this.showBills.bind(this);
        this.editCustomer = this.editCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
        this.hideBills = this.hideBills.bind(this);
        this.getBills = this.getBills.bind(this);
        this.showEdit = this.showEdit.bind(this);
        this.hideEdit = this.hideEdit.bind(this);

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

    showEdit(){
        this.setState({showEditModal: true});
    }

    hideEdit(){
        this.setState({showEditModal: false});
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
                {localStorage.getItem('token') && (<td><button onClick={this.showEdit}>Edit</button></td>)}
                {localStorage.getItem('token') && (<td><button onClick={this.deleteCustomer}>Delete</button></td>)}
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
                    {localStorage.getItem('token') && (<th>Delete</th>)}
                    {
                        this.state.bills.map(bill => (
                            <Bill key={bill.Id} bill={bill} refresh={this.getBills}/>
                        ))
                    }
                    </table>
                </ReactModal>
                <ReactModal 
                    isOpen={this.state.showEditModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.hideEdit}
                    shouldCloseOnOverlayClick={true}>
                     <EditCustomer customer={this.props.customer} refresh={this.props.refresh}/>
                </ReactModal>
            </tr>
        );
    }
}

export default Customer;
