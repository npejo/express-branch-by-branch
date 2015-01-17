exports.getTodosByUser = function() {
    // mock todos data
    var todos = [
        {
            'id': '1',
            'title': 'Title of the first todo',
            'body': 'This is the body of the first todo'
        },
        {
            'id': '2',
            'title': 'Title of the second todo',
            'body': 'This is the body of the second todo'
        },
        {
            'id': '3',
            'title': 'Title of the third todo',
            'body': 'This is the body of the third todo'
        }
    ];
    return todos;
};