import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import todo from './todo';

export default combineReducers({
    todos,
    visibilityFilter,
    todo
});