import React from 'react';

import { TasksStateType } from '../App';
import {
    AddTaskAC,
    ChangeTaskStatusAC, ChangeTaskTitleAC,
    RemoveTaskAC,
    TAddTask,
    tasksReducer,
    TChangeTaskStatus,
    TChangeTaskTitle,
    TRemoveTask
} from "./tasks-reducer";
import {AddTodolistAC, AddTodolistActionType, RemoveTodolistAC, RemoveTodolistActionType} from "./todolists-reducer";

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
    expect(endState['todolistId2'][1].title).toBe(newTaskTitle)
    expect(endState['todolistId1'][1].title).toBe('JS')
});

test('correct task status should be changed', () => {
    const action: TChangeTaskStatus = ChangeTaskStatusAC('todolistId2','2', false);

    const endState = tasksReducer(startState, action);
    expect(endState['todolistId2'][1].isDone).toBe(false)
    expect(endState['todolistId2'][0].isDone).toBe(true)
    expect(endState['todolistId1'].every(t => t.isDone === true)).toBeTruthy()
});

test('empty task should be created after todoList added', () => {
    const todoListTitle = 'New todoList'
    const action: AddTodolistActionType = AddTodolistAC(todoListTitle);

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey){
        throw Error('New key is not present')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([])
});

test('property with todolist should be deleted', () => {
    const action: RemoveTodolistActionType = RemoveTodolistAC('todolistId2');
    const endState = tasksReducer(startState, action);
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
});



