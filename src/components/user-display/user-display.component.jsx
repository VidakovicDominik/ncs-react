import React from 'react';

const UserDisplay=(props)=>(
    <div>
    <h2>{props.username}</h2>
    <h2>{props.email}</h2>
    </div>
);

export default UserDisplay;