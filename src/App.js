import { Component } from "react";
import "./App.css";

import MyBehaviorSubject from "./components/BehaviorSubject";
import MyObservable from "./components/Observable";
import RefExample from "./components/ReactRefExample";

class App extends Component {
  render() {
    return (
      <div
        className="App"
        style={{ display: "flex", flexDirection: "row", columnGap: 150 }}
      >
        <MyObservable />
        <MyBehaviorSubject />
        <RefExample />
      </div>
    );
  }
}

export default App;
