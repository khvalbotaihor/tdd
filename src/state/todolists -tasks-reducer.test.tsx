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

    const keys = Object.keys(endTaskState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.id)
    expect(idFromTodoLists).toBe(action.id)
})
