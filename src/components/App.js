import "./App.css";
//import ShoppingList from "./components/ShoppingList/ShoppingList";
import { Component } from "react";
import firebase, { auth, provider } from "../Firebase/firebase.js";
import Moment from "moment";
import Dashboard from "./Dashboard";
import Header from "./Header";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: "",
      username: "",
      items: [],
      user: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });

    const itemsRef = firebase.database().ref("items");
    itemsRef.on("value", (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          when: items[item].when,
          user: items[item].user,
        });
      }
      this.setState({
        items: newState,
      });
    });
  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({
        user: null,
      });
    });
  }

  login() {
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.setState({
        user,
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref("items");
    const item = {
      title: this.state.currentItem,
      user: this.state.user.displayName || this.state.user.email,
      when: Moment(Date()).format("DD-MM-YYYY"),
    };
    itemsRef.push(item);
    this.setState({
      currentItem: "",
      username: "",
    });
  }

  render() {
    return (
      <div className="app">
      <Header/>
        {this.state.user ? (
          <div>
            <div className="user-profile">
              <img alt="" src={this.state.user.photoURL} />
            </div>
            <div className="container">
              <section className="add-item">
                <form onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    name="username"
                    defaultValue={
                      this.state.user.displayName || this.state.user.email
                    }
                  />
                  <input
                    type="text"
                    name="currentItem"
                    placeholder="Grocery item to add?"
                    onChange={this.handleChange}
                  />
                  <button>Add Item</button>
                </form>
              </section>
            </div>
            <section className="display-item">
              <div className="wrapper">
                <ul>
                  {this.state.items.map((item) => {
                    return (
                      <li key={item.id}>
                        <h3>{item.title}</h3>
                        <p>Added by: {item.user}</p>
                        <p>
                          {" "}
                          On: {item.when}
                          {item.user === this.state.user.displayName ||
                          item.user === this.state.user.email ? (
                            <button onClick={() => this.removeItem(item.id)}>
                              Remove Item
                            </button>
                          ) : null}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          </div>
        ) : (
         <Dashboard />
        )}
      </div>
    );
  }
}

export default App;
