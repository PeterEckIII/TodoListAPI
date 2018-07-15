$(document).ready(function () {
    $.getJSON("/api/todos")
        .then(addTodos)

    $('#todoInput').keypress(function (event) {
        if (event.which == 13) {
            createTodo();
        }
    });

    $('.list').on('click', 'li', function () {
        updateTodo($(this));
    })

    $('.list').on('click', 'span', function (event) {
        event.stopPropagation(); // stops the parent li from triggering
        removeTodo($(this).parent());
    });

    $(".list").on("click", "span", function() {
        removeTodo($(this).parent());
    });
});

function addTodos(todos) {
    todos.forEach(function (todo) {
        addTodo(todo);
    });
}

function addTodo(todo) {
    var newTodo = $('<li class="task">' + todo.name + ' <span>X</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if (todo.completed) {
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
}

function createTodo() {
    var usrInput = $('#todoInput').val();
    $.post('/api/todos', {
            name: usrInput
        })
        .then(function (newTodo) {
            $('#todoInput').val('');
            addTodo(newTodo);
        })
        .catch(function (err) {
            console.log(err);
        })
}

function removeTodo(todo) {
    var clickedId = todo.data("id");
    var deleteURL = "api/todos/" + clickedId;
    $.ajax({
        url: deleteURL,
        method: "DELETE",
    })
    .then(function (data) {
        todo.remove();
    })
    .catch(function (error) {
        console.log(error);
    });
}

function updateTodo(todo) {
    var updateUrl = "api/todos/" + todo.data("id");
    var isDone = !todo.data("completed");
    var updateData = {completed: isDone}
    $.ajax({
        method: "PUT",
        url: updateUrl,
        data: updateData
    })
    .then(function(updatedTodo) {
        todo.toggleClass("done");
        todo.data("completed", isDone);
    })
    .catch(function(error) {
        console.log(error);
    })
}