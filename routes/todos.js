var express = require("express"),
    router  = express.Router(),
    db      = require("../models"),
    controllers = require("../controllers/todos");


router.route("/")
    .get(controllers.getTodos)
    .post(controllers.createTodo)

router.route("/:todoId")
    .get(controllers.getTodo)
    .put(controllers.updateTodo)
    .delete(controllers.deleteTodo)


module.exports = router;
