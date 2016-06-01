var _ = require('underscore');
 
var listItems =
[
    {
        "id": 1,
        "text": "Get Up"
    },
    {
        "id": 2,
        "text": "Brush teeth"
    },
    {
        "id": 3,
        "text": "Get Milk"
    },
    {
        "id": 4,
        "text": "Prepare coffee"
    },
    {
        "id": 5,
        "text": "Have a hot cup of coffee"
    }
];
 
exports.list = function(req, res){    
    res.send(listItems);
};
 
exports.addToList = function (req, res) {
    var maxId = _.max(listItems, function (item) { return item.id });
    console.log(maxId);
    var newTodoItem = { "id": maxId.id + 1, "text": req.body.text };
    listItems.push(newTodoItem);
    res.send({ success: true, item: newTodoItem });
};