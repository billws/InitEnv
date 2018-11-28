let nextTodoId = 0;

const addTodo = text => ({
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
});

const newTodo = text => ({
    type: 'INPUT_TYPING',
    text
});

const clearTodo = () => ({
    type: 'INPUT_CLEARING'
});

const setVisibilityFilter = filter => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
});

const toggleTodo = id => ({
    type: 'TOGGLE_TODO',
    id
});

const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export {
    addTodo,
    newTodo,
    clearTodo,
    setVisibilityFilter,
    toggleTodo,
    VisibilityFilters
};