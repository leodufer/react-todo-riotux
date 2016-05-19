import React from "react";
import ReactDOM from "react-dom";
import Tasks from "./tasks.jsx";

export default class Todo extends React.Component {
  constructor( ) {
    super();
    this.state = {
      todos: riotux.get('todos')
    }
    this.addTask = this.addTask.bind(this)
  }
  
  componentWillMount() {
    var self = this
    riotux.subscribe(this, 'todos', function ( state, value ) {
      console.log(state, value);
      self.setState({ todos: value });
    });
  }
  
  addTask ( ) {
    var todo = ReactDOM.findDOMNode(this.refs.task);
    riotux.action('todos', 'ADD_TODO', todo.value);
    todo.value = "";
  }
 
  
  render() {
    return (
        <div className="six columns full">
          <h1 className="title">React Todo with riotux </h1>
          <label for="task">Add task:</label>
          <input type="text" className="todo-value" name="task" ref="task" />
          <button className="button-primary add-todo" onClick={ this.addTask }> Add Task </button>
        </div>
    );
  }
};