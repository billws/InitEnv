import React from 'react';
import PropTypes from 'prop-types';

const AddTodo = ({todo, newTodo, addTodo}) => {
    return (
        <div>
            <input value={todo} onChange={(e) => newTodo(e.target.value)} />
            <button onClick={() => addTodo(todo)}>Add Todo</button>
        </div>
    );
};

AddTodo.propTypes = {
    todo: PropTypes.string.isRequired,
    newTodo: PropTypes.func.isRequired,
    addTodo: PropTypes.func.isRequired
};

export default AddTodo;