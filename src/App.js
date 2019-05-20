import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      newItem2: "",
      list: []
    };
  }

  updateInput(key, value) {
    // update react state
    this.setState({ [key]: value });
  }

  addItem() {
    // create a new item
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice(),
    };
    const newItem2 = {
      id: 1 + Math.random(),
      value: this.state.newItem2.slice(),
    };
    // copy current list of items
    const list = [...this.state.list];

    // add the new item to the list
    list.push(newItem);
    list.push(newItem2);

    // update state with new list, reset the new item input
    this.setState({
      list,
      newItem: "",
      newItem2: ""
    });
  }

  deleteItem(id) {
    // copy current list of items
    const list = [...this.state.list];
    // filter out the item being deleted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });
  }

  render() {
    return (
      <div className="App" id="app">
        <header className="App-header">
  {/*<img src={logo} className="App-logo" alt="logo" />*/} 
          <h1 className="App-title">Shoping Cat</h1>
        </header>
        <div id="space"
          style={{
            padding: 200,
            textAlign: "center",
            maxWidth: 500,
            margin: "auto"
          }}
        >
         <h3>Add an item to the list</h3> 
          <br />
        
          <input
            type="text"
            placeholder="Type item here"
            value={this.state.newItem}
            onChange={e => this.updateInput("newItem", e.target.value)}
          /><br></br>
          <div id="add">
              <button className="text-center"
            onClick={() => this.addItem()}
            disabled={!this.state.newItem.length}
          >
           Add
          </button>
          </div>
        
          <br /> <br />
          
            {this.state.list.map(item => {
              return (
                <div id="item">
                <li key={item.id}>
                  {item.value}
                  <br></br>
                  <button onClick={() => this.deleteItem(item.id)}>
                    Remove
                  </button>
                </li>
                </div>
              );
            })}
          
        </div>
      </div>
    );
  }
  updateInput(key, value) {
    // update react state
    this.setState({ [key]: value });
  
    // update localStorage
    localStorage.setItem(key, value);
  }
  addItem() {
    // create a new item
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
    };
 // copy current list of items
    const list = [...this.state.list];

    // add the new item to the list
    list.push(newItem);
    

    // update state with new list, reset the new item input
    this.setState({
      list,
      newItem: ""
      
    });

    // update localStorage
    localStorage.setItem("list", JSON.stringify(list));
    localStorage.setItem("newItem", "");
  }
  
deleteItem(id) {
  // copy current list of items
  const list = [...this.state.list];
  // filter out the item being deleted
  const updatedList = list.filter(item => item.id !== id);

  this.setState({ list: updatedList });

  // update localStorage
  localStorage.setItem("list", JSON.stringify(updatedList));
}

hydrateStateWithLocalStorage() {
  // for all items in state
  for (let key in this.state) {
    // if the key exists in localStorage
    if (localStorage.hasOwnProperty(key)) {
      // get the key's value from localStorage
      let value = localStorage.getItem(key);

      // parse the localStorage string and setState
      try {
        value = JSON.parse(value);
        this.setState({ [key]: value });
      } catch (e) {
        // handle empty string
        this.setState({ [key]: value });
      }
    }
  }
}
componentDidMount() {
  this.hydrateStateWithLocalStorage();
}
saveStateToLocalStorage() {
  // for every item in React state
  for (let key in this.state) {
    // save to localStorage
    localStorage.setItem(key, JSON.stringify(this.state[key]));
  }
}
componentDidMount() {
  this.hydrateStateWithLocalStorage();

  // add event listener to save state to localStorage
  // when user leaves/refreshes the page
  window.addEventListener(
    "beforeunload",
    this.saveStateToLocalStorage.bind(this)
  );
}
componentWillUnmount() {
  window.removeEventListener(
    "beforeunload",
    this.saveStateToLocalStorage.bind(this)
  );

  // saves if component has a chance to unmount
  this.saveStateToLocalStorage();
}
}


export default App;
