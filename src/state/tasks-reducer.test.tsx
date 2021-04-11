import React, {useState} from 'react';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {
    AddTaskAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    TAddTask,
    tasksReducer,
    TChangeTaskTitle,
    TRemoveTask
} from "./tasks-reducer";

let startState: TasksStateType;

beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true}
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "React Book", isDone: true}
        ]
    }
})

test('correct task should be removed', () => {
    const action: TRemoveTask = RemoveTaskAC('todolistId2', '2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'].length).toBe(1);
    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId2'][2]).toBeUndefined()
});

test('correct task should be added', () => {
    const taskName = 'new Task is added'
    const action: TAddTask = AddTaskAC('todolistId2', taskName)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe(taskName)

});

test('correct task should change its name', () => {
    let newTaskTitle = "New Todolist";
    const action: TChangeTaskTitle = ChangeTaskTitleAC('todolistId2','2',newTaskTitle);

    const endState = tasksReducer(startState, action);

});

test('correct task status should be changed', () => {
    let newFilter: FilterValuesType = "completed";
    const action = ChangeTodolistFilterAC(todolistId2, newFilter);

    const endState = tasksReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


