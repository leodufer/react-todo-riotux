import React from "react";
import ReactDOM from "react-dom";

export default class Tasks extends React.Component {
  constructor(props){
    super(props);
    this.removeTask = this.removeTask.bind(this);
  }
  
  removeTask ( event ) {
    riotux.action('todos', 'REMOVE_TASK', event.target.id);
  }
  
  componentWillMount() {
    var self = this;
    riotux.subscribe(this, 'todos', function(state, value){
      self.forceUpdate();
    })
  }
  render ( ) {
    return (
      <div className="six columns full gray">
      <h1 className="title"> Tasks: { this.props.todos.length }</h1>
        <ul>
          {this.props.todos.map((todo, index) => {
            return <li key={index} id={index} onClick={ this.removeTask }> #{index} { todo } </li>
          })}
        </ul>
      </div>
    )
  }
}