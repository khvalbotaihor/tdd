type StateType = {
    age: number
    childrenCount: number
    name: string
}

export type TIncrementAge = {
    type: 'INCREMENT-AGE'
}

export type TIncrementChildrenCount = {
    type: 'INCREMENT-CHILDREN-COUNT'
}

export type TChangeName = {
    type: 'CHANGE-NAME'
    newName: string
}

type ActionType = TIncrementAge | TIncrementChildrenCount | TChangeName

export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            let newState = {...state};
            newState.age = state.age + 1;
            return newState;
        case 'INCREMENT-CHILDREN-COUNT':
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            };
        case 'CHANGE-NAME':
            return {
                ...state,
                name: action.newName
            };
        default:
            throw new Error("I don't understand this type")
    }
}
