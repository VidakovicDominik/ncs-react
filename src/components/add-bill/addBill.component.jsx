import React from "react"
import "./addBill.style.scss"
import { get, post } from "../../rest-client/rest-client"
import axios from "axios"

class AddBill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Date: "",
            BillNumber: "",
            CustomerId: this.props.customerId,
            SellerId: 1,
            CreditCardId: 9458,
            Comment: "",
            Sellers: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount() {
        axios.get('http://www.fulek.com/nks/api/aw/sellers').then(res => this.setState({ Sellers: res.data })).catch(error => console.log(error));
    }

    getDate() {
        var today = new Date();
        var dd = today.getDate();

        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }
        today = mm + '-' + dd + '-' + yyyy;
        return today;
    }

    async onSubmit(event) {
        event.preventDefault();
        const bill = {
            CustomerId: this.state.CustomerId,
            BillNumber: this.state.BillNumber,
            Comment: this.state.Comment,
            SellerId: this.state.SellerId,
            CreditCardId: this.state.CreditCardId,
            Date: this.getDate()
        }
        console.log(bill);
        axios.post("http://www.fulek.com/nks/api/aw/addbill",
            bill,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }).then(response => { console.log(response.data) })
            .then(await new Promise(r => setTimeout(r, 400)))
            .then(this.props.refresh)
            .catch(error => console.log(error));
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }


    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="input-container">
                <input className="input" placeholder="Bill Number" type="text" name="BillNumber" value={this.state.name} onChange={this.handleChange}></input>
                <input className="input" placeholder="Comment" type="text" name="Comment" value={this.state.name} onChange={this.handleChange}></input>
                <select className="input" name="SellerId" value={this.state.SellerId} onChange={this.handleChange}>
                    {
                        this.state.Sellers.map(seller => (
                            <option key={seller.Id} value={seller.Id}>
                                {seller.Name} {seller.Surname}
                            </option>
                        ))
                    }
                </select>
                <input class="submit" type="submit" value="Add"></input>
                </div>
            </form>
        );
    }
}

export default AddBill;
