import React from 'react';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
/*
import TodoList from './TodoList';

const testData = [
    {
        id: 0,
        text: 'one',
        completed: false
    },
    {
        id: 1,
        text: 'two',
        completed: false
    }
];

const testFunc = () => {
    console.log('1');
};
*/
const App = () => {
    return (
    <div>
        <AddTodo />
        <VisibleTodoList />
        {/*<TodoList todos={testData} toggleTodo={testFunc} />*/}
        <Footer />
    </div>
)};


export default App;