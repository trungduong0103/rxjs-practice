import { Component } from "react";
import "./App.css";

import MyObservable from "./components/Observable";
import RefExample from "./components/ReactRefExample";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyObservable />
        <RefExample />
      </div>
    );
  }
}

export default App;
