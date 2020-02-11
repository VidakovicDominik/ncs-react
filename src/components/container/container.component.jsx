import React from 'react';
import './container.style.scss';
import Customer from "../customer/customer.component"
import AddCustomer from "../add-customer/addCustomer.component"
import Header from "../header/header.component"
import { get } from "../../rest-client/rest-client"

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            title: props.title,
            customers: [],
            showCount: 10,
            filter: ""
        };


        this.getCustomers = this.getCustomers.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.sortCustomersByName = this.sortCustomersByName.bind(this);
        this.sortCustomersBySurname = this.sortCustomersBySurname.bind(this);
        this.sortCustomersByEmail = this.sortCustomersByEmail.bind(this);
        this.sortCustomersByTelephone = this.sortCustomersByTelephone.bind(this);
        this.filterCustomers = this.filterCustomers.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    sortCustomersByName() {
        const sortedCustomers = this.state.customers.sort((a, b) => a.Name.localeCompare(b.Name));
        this.setState({ customers: sortedCustomers });
    }

    sortCustomersBySurname() {
        const sortedCustomers = this.state.customers.sort((a, b) => a.Surname.localeCompare(b.Surname));
        this.setState({ customers: sortedCustomers });
    }

    sortCustomersByEmail() {
        const sortedCustomers = this.state.customers.sort((a, b) => a.Email.localeCompare(b.Email));
        this.setState({ customers: sortedCustomers });
    }

    sortCustomersByTelephone() {
        const sortedCustomers = this.state.customers.sort((a, b) => a.Telephone.localeCompare(b.Telephone));
        this.setState({ customers: sortedCustomers });
    }

    filterCustomers(caller) {
        this.setState({ filter: caller.target.value })
    }

    updateUser(user) {
        this.setState({ currentUser: user })
    }

    componentDidMount() {
        this.getCustomers();
    }

    getCustomers() {
        get("customers").then(body => this.setState({ customers: body }));
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { customers, filter } = this.state;
        const filteredCustomers = customers.filter(customer =>
            customer.Name.toLowerCase().includes(filter.toLowerCase())
            || customer.Surname.toLowerCase().includes(filter.toLowerCase())
            || customer.Email.toLowerCase().includes(filter.toLowerCase())
            || customer.Telephone.toLowerCase().includes(filter.toLowerCase())
        );
        
        return (
            <div>
                <Header updateUser={this.updateUser} />
                {localStorage.getItem('token') && (<AddCustomer />)}
                <input className="input filter" placeholder="Filter" type="text" value={this.state.filter} onChange={this.filterCustomers} />
                <select className="input" name="showCount" value={this.state.showCount} onChange={this.handleChange}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <table>
                    <th onClick={this.sortCustomersByName}>Name</th>
                    <th onClick={this.sortCustomersBySurname}>Surname</th>
                    <th onClick={this.sortCustomersByEmail}>Email</th>
                    <th onClick={this.sortCustomersByTelephone}>Telephone</th>
                    <th>Bills</th>
                    {localStorage.getItem('token') && (<th>Edit</th>)}
                    {localStorage.getItem('token') && (<th>Delete</th>)}
                    {
                        filteredCustomers.slice(0,this.state.showCount).map(customer => (
                            <Customer key={customer.Id} customer={customer} refresh={this.getCustomers} />
                        ))
                    }
                </table>
            </div>
        )
    }

}

export default Container;