import React from "react"
import ReactModal from "react-modal"
import "./customer.style.scss"
import {billTemplate} from "../../template"
import {get, post} from "../../rest-client/rest-client"
import Bill from "../bill/bill.component"

class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: props.customer,
            bills: billTemplate,
            showBillsModal: false
        };

        this.showBills=this.showBills.bind(this);
        this.editCustomer=this.editCustomer.bind(this);
        this.deleteCustomer=this.deleteCustomer.bind(this);
        this.hideBills=this.hideBills.bind(this);
    }

    componentDidMount(){
        get("customerBills/"+this.state.customer.Id).then(body=>this.setState({bills:body}));
    }

    showBills(){
        this.setState({showBillsModal: true});
    }

    hideBills(){
        this.setState({showBillsModal: false});
    }

    editCustomer(){

    }

    deleteCustomer(){

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
               {
                this.state.bills.map(bill=>(
                    <Bill key={bill.Id} bill={bill}/>
                ))
               }
               <button onClick={this.hideBills}>Close Modal</button>
             </ReactModal>
            </tr>
        );
    }
}

export default Customer;