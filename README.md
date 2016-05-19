## What is riotux?
> riotux is an reactive centralized state management for javascript applications. It is inspired by Flux and Redux, but with simplified concepts.

<pre align="center">
╔═════════╗       ╔═══════════╗       ╔═══════════╗       ╔═════════════════╗
║ Actions ║──────>║ Mutations ║ ────> ║   State   ║ ────> ║ View Components ║
╚═════════╝       ╚═══════════╝       ╚═══════════╝       ╚═════════════════╝
     ^                                                            │
     └────────────────────────────────────────────────────────────┘

</pre>

Go to <a href="https://github.com/luisvinicius167/riotux"> riotux. </a>

The component triggers action calls. Actions dispatch mutations that change the state. Changes in state flow from the store back into the component.

## React Todo <br>
<a href="https://github.com/luisvinicius167/react-todo-riotux"> Demo. </a>

In this app, we has a store and the React component. The store is basically a container that holds your application state.

### The Store 
There are two things that makes a riotux store different:

* The store are **reactive**. Your component can observe changes in the store state, and when the state is changed, your component handler function will called.

* You cannot directly mutate the store’s state. The only way to change a store’s state is by explicitly dispatching mutations.

Let’s create our store.

```javascript
riotux.Store({
  state: {
    todos: []
  },
  mutations: {
    ADD_TASK: function ( state, task ) {
      state.todos.push(task);
    },
    REMOVE_TASK: function ( state, index ) {
      state.todos.splice(index, 1);
    }
  }
});
```

We have a state called **todos** and the mutations, that are an object that contains functions that will be change the state. Use the method called dispatch to trigger the store mutation function, to change the state.

The mutations are essentially events: each mutation has a name and a callback. **In riotux the callback function will receive the state as the first argument.**

### Actions 
The actions are just functions that dispatch mutations. **All actions recieves the store as frist argument.**
The actions will be called from components.

Our action:
```javascript
riotux.Actions({
  ADD_TODO: function ( store, task ) {
    store.dispatch('ADD_TASK', task);
  },
  REMOVE_TASK: function ( store, index ) {
    store.dispatch('REMOVE_TASK', index);
  }
});
```

### Component 

To recieve the new state value, you need to use ``` riotux.subscribe(component, [state], handler) ```. **component** is your component (this), and **state** is an array with all states that you want to observe changes. When the state changes, yout handler function will be triggered.

Your **handler function** recieves the *state_name* as first argument and the *value* as second argument.

The ```riotux.action``` recieves the **state** that you wants to change as first argument, the **mutation event name** as the second argument and the values you nedd to pass like arguments to the mutation callback.

### Get a state value
To get the state value, we use ```riotux.get(state_name)```.

### Show me the Code:

```javascript
// Todo.jsx
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

//Tasks.jsx
export default class Tasks extends React.Component {
  constructor(props){
    super(props);
    this.removeTask = this.removeTask.bind(this);
  }
  
  removeTask ( event ) {
    riotux.action('todos', 'REMOVE_TASK', event.target.id);
  }
  
  // subscribe for changes in the state 'todos' and update the component
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
};

// App.jsx
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
};

ReactDOM.render(<App/>, app);
```

As you can see, when the state changes on your store, you can update your component. You just recieve the state using ```riotux.get();``` when your component updates.

### Conclusion 
riotux is inspired in Redux and Flux concepts, but more simplest. Is easely to get started and you can use riotux now. Visit the <a href="https://github.com/luisvinicius167/riotux"> riotux documentation</a> and I hope that riotux can helps you. **Star riotux if you liked :)**

Thanks!
