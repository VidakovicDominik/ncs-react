import React from 'react';
import './App.css';
import Container from './components/container/container.component'
import UserDisplay from './components/user-display/user-display.component'

function App() {
  return (
    <Container title="NCS projectt">
      <UserDisplay username="nitko" email="nitko@nigdje.nis"/>
    </Container>
  );
}

export default App;
