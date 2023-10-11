const router = require("express").Router();
import { getAllTodos, getATodo, createATodo, updateATodo, deleteATodo }  from "../controllers/todos.controller";

router.get("/todos-all", getAllTodos);
router.get("/todo/:id", getATodo);
router.post("/todo/new", createATodo);
router.put("/todo/:id", updateATodo);
router.delete("/todo/:id", deleteATodo);

export default router;
