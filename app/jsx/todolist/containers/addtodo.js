import { connect } from 'react-redux';
import { newTodo, clearTodo, addTodo } from '../actions';
import AddTodo from '../components/AddTodo'


const mapStateToProps = state => ({
    todo: state.todo
});

const mapDispatchToProps = dispatch => ({
    newTodo: text => dispatch(newTodo(text)),
    addTodo: text => {dispatch(addTodo(text)); dispatch(clearTodo());}
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTodo);