import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import {TodolistActionsType, todolistReducer} from "./todolist-reducer";
import {TaskActionsType, taskReducer} from "./task-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootRedcer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer
})

// определить автоматически тип всего объекта состояния
export const store = createStore(rootRedcer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>
//export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

type AppActionsType = TaskActionsType | TodolistActionsType



// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store


// type AppRootState = {
//     todolists: Array<TodolistsType>
//     tasks: TasksStateType
// }