import { v1 } from "uuid"
import { TasksStateType } from "../App"
import { title } from "process"
import { ScienceTwoTone, SettingsBackupRestoreSharp } from "@mui/icons-material"
import { AddTodolistActionType, RemoveTodoListActionType, todolistId1, todolistId2 } from "./todolists-reducer"

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolitsId: string,
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string,
    isDone: boolean,
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    title: string,
    todolistId: string
}

export type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType
                            | AddTodolistActionType | RemoveTodoListActionType

const initialState: TasksStateType = {
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Milk", isDone: true },
    ],
  }

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolitsId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolitsId] = filteredTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTask = {id: v1(), title: action.title, isDone: false};
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId];
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone;
            }
            return stateCopy 
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId];
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title;
            }
            return stateCopy 
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}

            stateCopy[action.todolistId] = [];

            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy
        }

        default:
            return state; 
    }
}

export const removeTaskAC = (taskId: string, todolitsId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', todolitsId, taskId }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todolistId }
}

export const changeTaskStatuskAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId }
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', title, todolistId, taskId }
}
