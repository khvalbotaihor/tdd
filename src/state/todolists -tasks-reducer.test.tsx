import React from 'react';
import {TasksStateType, TodolistType} from "../App";
import {AddTodolistAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equal', () => {
    const startTaskState : TasksStateType = {}
    const startTodolistState: Array<TodolistType> = []

    const action = AddTodolistAC('New todolist')

    const endTaskState = tasksReducer(startTaskState, action)
    const endTodolistsState = todolistsReducer(startTodolistState, action)




})
