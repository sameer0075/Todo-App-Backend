import { Request, Response, NextFunction } from 'express';
import { TodoDto } from '../dto/request.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
const Todo = require("../models/todos.model");


// make a controller for get all todos
const getAllTodos = async (req:Request, res:Response) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 }).select('_id title description status');;
      res.status(200).json({
        status:true,
        message: "Get all todos successfully.",
        data: todos,
      });
  } catch (error:any) {
    res.status(422).json({ status:false, error: error.message });
  }
};

// make a controller for get a todo
const getATodo = async (req:Request, res:Response) => {
  try {
    const { id: todoId } = req.params;
    const todo = await Todo.findOne({ _id: todoId }).select('_id title description status');

    if (!todo) {
      res.status(403).json({ status:false, error: `No Todo with id: ${todoId}` });
    } else {
      res.status(200).json({
        status:true,
        message: "Get a todo successfully.",
        data: todo,
      });
    }
  } catch (error:any) {
    res.status(422).json({ status:false, error: error.message });
  }
};

// make a controller for create a todo
const createATodo = async (req:Request, res:Response) => {
  try {
    const newTodo = plainToClass(TodoDto, req.body); // Convert request data to TodoDto instance
    const errors = await validate(newTodo);

    if (errors.length > 0) {
      const validationErrors = {};
      errors.forEach((error) => {
        const constraints = error.constraints;
        if (constraints) {
          for (const key in constraints) {
            validationErrors[error.property] = constraints[key];
          }
        }
      });

      return res.status(422).json({ status: false, error: validationErrors });
    }

    if (!newTodo.status) {
      newTodo.status = "ACTIVE";
    }

    const todo = new Todo({
      title: newTodo.title,
      description: newTodo.description,
      status: newTodo.status,
      createdAt: newTodo.createdAt,
    });
    // Save the new Todo instance to the database
    await todo.save();
    const response = {
      _id:todo._id,
      title: newTodo.title,
      description: newTodo.description,
      status: newTodo.status,
    }
  
    return res.status(200).json({
      status:true,
      message: "Create a new todo successfully.",
      data:response
    });
  } catch(error:any) {
    res.status(422).json({ status:false, error: error.message });
  }
};

// make a controller for update a todo
const updateATodo = async (req:Request, res:Response) => {
  try {
    const newTodo = plainToClass(TodoDto, req.body); // Convert request data to TodoDto instance
    const errors = await validate(newTodo);

    if (errors.length > 0) {
      const validationErrors = {};
      errors.forEach((error) => {
        const constraints = error.constraints;
        if (constraints) {
          for (const key in constraints) {
            validationErrors[error.property] = constraints[key];
          }
        }
      });

      return res.status(422).json({ status: false, error: validationErrors });
    }

    const { id } = req.params;
    const todoPayload = {
      title: newTodo.title,
      description: newTodo.description,
      status: newTodo.status,
    };
    const todo = await Todo.findByIdAndUpdate({_id:id}, todoPayload, { new: true, runValidators: true }).select('_id title description status');;

    if (!todo) {
      res.status(403).json({ status:false, error: `No todo with id: ${id}` });
    } else {
      res.status(200).json({
        status:true,
        message: `Todo with id: ${id} updated successfully.`,
        todo: todo,
      });
    }
  } catch (error:any) {
    res.status(422).json({ status:false, error: error.message });
  }
};

// make a controller for delete a todo
const deleteATodo = async (req:Request, res:Response) => {
  try {
    const { id: todoId } = req.params;
    const savedTodo = await Todo.findOne({ _id: todoId }).select('_id title description status');

    const todo = await Todo.findByIdAndDelete(todoId);

    if (!todo) {
      return res.status(403).json({ status:false, error: `No todo with id: ${todoId}` });
    } else {
      res.status(200).json({
        status:true,
        message: `Todo with id: ${todoId} deleted successfully.`,
        data: savedTodo,
      });
    }
  } catch (error:any) {
    res.status(422).json({ status:false, error: error.message });
  }
};

export { getAllTodos, getATodo, createATodo, updateATodo, deleteATodo }
