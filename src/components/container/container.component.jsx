import React from 'react';
import './container.style.scss';

class Container extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:props.title
        };
    }

    render(){
        return (
            <div>
            <h1>{this.state.title}</h1>
            {this.props.children}
            </div>
        )
    }

}

export default Container;