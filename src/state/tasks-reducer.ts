import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';

export type TRemoveTask = {
    type: 'REMOVE-TASK',
    todolistId: string,
    id: string
}
export type TAddTask = {
    type: 'ADD-TASK',
    todolistId: string,
    title: string
}
export type TChangeTaskTitle = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string,
    id: string
    title: string
}

type ActionsType = TRemoveTask | TAddTask | TChangeTaskTitle

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const copyState = {...state}
            const todoList = copyState[action.todolistId]
            copyState[action.todolistId] = todoList.filter(t => t.id !== action.id)
            return copyState
        }
        case 'ADD-TASK': {
            const copyState = {...state}
            const newTask = {id: v1(), title: action.title, isDone: false}
            const todoList = copyState[action.todolistId]
            copyState[action.todolistId] = [newTask, ...todoList]
            return copyState
        }
        case "CHANGE-TASK-TITLE": {
            const copyState = {...state}
            const todoList = copyState[action.todolistId]
            const task = todoList.find(t => t.id === action.id)
            if (task){
                task.title=action.title
            }
            return copyState
        }

        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTaskAC = (todolistId: string, id: string): TRemoveTask => {
    return { type: 'REMOVE-TASK', todolistId, id }
}
export const AddTaskAC = (todolistId: string, title: string): TAddTask => {
    return { type: 'ADD-TASK', todolistId, title}
}
export const ChangeTaskTitleAC = (todolistId: string, id: string, title: string): TChangeTaskTitle => {
    return { type: 'CHANGE-TASK-TITLE', todolistId, id, title }
}

