import React from "react";
import ReactDOM from "react-dom";
import Todo from "./todo.jsx";
import Tasks from "./tasks.jsx";

const app = document.getElementById('app');

class App extends React.Component {
  render() {
    return (
      <div>
        <Todo/>
        <Tasks todos = { riotux.get('todos') }/>  
       </div>
    )
  }
}

ReactDOM.render(<App/>, app);