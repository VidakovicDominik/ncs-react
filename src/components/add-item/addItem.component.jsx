import React from "react"
import "./addItem.style.scss"
import { get, post } from "../../rest-client/rest-client"
import axios from "axios"

class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            BillId: this.props.billId,
            ProductId: 771,
            Quantity: null,
            Products: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount() {
        axios.get('http://www.fulek.com/nks/api/aw/products/1').then(res => this.setState({ Products: res.data })).catch(error => console.log(error));
    }

    async onSubmit(event) {
        event.preventDefault();
        const item = {
            BillId: this.state.BillId,
            ProductId: this.state.ProductId,
            Quantity: this.state.Quantity,
        }
        console.log(item);
        axios.post("http://www.fulek.com/nks/api/aw/additem",
        item,
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
                    <input className="input" placeholder="Quantity" type="number" name="Quantity" value={this.state.Quantity} onChange={this.handleChange}></input>
                    <select className="input" name="ProductId" value={this.state.ProductId} onChange={this.handleChange}>
                        {
                            this.state.Products.map(product => (
                                <option key={product.Id} value={product.Id}>
                                    {product.Name}
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

export default AddItem;
