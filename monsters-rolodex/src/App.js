import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import CardList from "./components/card-list/cardList";
import SearchBox from "./components/search-box/searchBox";

class App extends Component {
  constructor() {
    super();
    this.state = {
      //always a json obj
      //give a key value pair
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(() => {
          return { monsters: users };
        })
      );
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLowerCase();
    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    const filteredMonsters = this.state.monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(this.state.searchField);
    });
    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox
          onChangeHandler={this.onSearchChange}
          placeholder="search monsters"
          className="searchBox"
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
