import React from "react"
import "./addCustomer.style.scss"
import { get, post } from "../../rest-client/rest-client"
import axios from "axios"

class AddCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Surname: "",
            Email: "",
            Telephone: "",
            CityId: 1,
            Cities: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://www.fulek.com/nks/api/aw/cities').then(res => this.setState({ Cities: res.data })).catch(error => console.log(error));
    }

    onSubmit(event) {
        event.preventDefault();
        const cust = {
            Name: this.state.Name,
            Surname: this.state.Surname,
            Email: this.state.Email,
            Telephone: this.state.Telephone,
            CityId: this.state.CityId
        };
        axios.post("http://www.fulek.com/nks/api/aw/addcustomer",
            cust,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }).then(response => { console.log(response.data) }).catch(error => console.log(error));
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="input-container">
                    <input className="input" placeholder="Name" type="text" name="Name" value={this.state.Name} onChange={this.handleChange}></input>
                    <input className="input" placeholder="Surname" type="text" name="Surname" value={this.state.Surname} onChange={this.handleChange}></input>
                    <input className="input" placeholder="Email" type="text" name="Email" value={this.state.Email} onChange={this.handleChange}></input>
                    <input className="input" placeholder="Telephone" type="text" name="Telephone" value={this.state.Telephone} onChange={this.handleChange}></input>
                    <select className="input" name="CityId" value={this.state.CityId} onChange={this.handleChange}>
                        {
                            this.state.Cities.map(city => (
                                <option key={city.Id} value={city.Id}>
                                    {city.Name}
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

export default AddCustomer;
