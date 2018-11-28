const todo = (state = '', action) => {
    switch (action.type) {
        case 'INPUT_TYPING':
            return action.text.slice(0);
        case 'INPUT_CLEARING':
            return '';
        default:
            return state;
    }
}

export default todo;