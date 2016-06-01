var todoOperations = function () {
    var todos;
 
    function getAllTodos() {
        //var deferred=$.defer();
 
        return $.get("/todos", function (data) {
            todos = data;
        });
    }
 
    function addTodo(todoItem) {
        return $.post('/todos', todoItem);
    }
 
    return {
        getAllTodos: getAllTodos,
        addTodo: addTodo
    }
}();
 
var list;
 
function refreshTodos() {
    todoOperations.getAllTodos().then(function (data) {
        $.each(data, function () {
            list.append("<li data-id='" + this.id + "'>" + this.text + "</li>");
        });
    });
}
 
$(function () {
    list = $("#todoList");
 
    $("#btnAddTodo").click(function () {
        var textBox = $("#txtNewTodo");
        if (textBox.val() !== "") {
            todoOperations.addTodo({ "text": textBox.val() }).then(function (data) {
                if (data.success === true) {
                    list.append("<li data-id='" + data.item.id + "'>" + data.item.text + "</li>");
                    textBox.val('');
                }
            });
        }
    });
 
    refreshTodos();
});

