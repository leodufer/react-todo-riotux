riotux.Actions({
  ADD_TODO: function ( store, task ) {
    store.dispatch('ADD_TASK', task);
  },
  REMOVE_TASK: function ( store, index ) {
    store.dispatch('REMOVE_TASK', index);
  }
});