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