import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export type SomeActionCreatorType1 = {
    type: '',
    id: string
}
export type SomeActionCreatorType2 = {
    type: '',
    id: string
}

type ActionsType = SomeActionCreatorType1 | SomeActionCreatorType2

export const tasksReducer = (state: Array<TodolistType>, action: ActionsType) => {
    switch (action.type) {
        case '':
            return state

        default:
            throw new Error("I don't understand this type")
    }
}

export const SomeAC1 = (id: string): SomeActionCreatorType1 => {
    return { type: '', id}
}
export const SomeAC2 = (id: string): SomeActionCreatorType2 => {
    return { type: '', id}
}

