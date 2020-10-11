import React, { Component } from "react";
import './App.scss';
import ProductList from "./ProductList";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className='App'>
        <ProductList />
      </div>
    );
  }
}

export default App;