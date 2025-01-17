import { ChangeTodolistFilterActionType, todolistsReducer } from "./todolists-reducer";
import { v1 } from "uuid";
import { TodoListType } from "../App";
import { FilteValuesType } from "../App";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, { type: 'REMOVE-TODOLIST', id: todolistId1})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})



test('correct todoList should be added', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newTodoListTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    const newTodolistId = v1(); 

    const endState = todolistsReducer(startState, { type: 'ADD-TODOLIST', title: newTodoListTitle, todolistId: newTodolistId })

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodoListTitle);
    expect(endState[0].filter).toBe("all");
    expect(endState[0].id).toBe(newTodolistId); 
})

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, { type: 'REMOVE-TODOLIST', id: todolistId1})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})


test('to do list should chenge its name', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newTodoListTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: todoListId2,
        title: newTodoListTitle
    }

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodoListTitle);
})

test('correct filter of todolist should be changed', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newFilter: FilteValuesType = "completed";

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todoListId2,
        filter: newFilter
    }

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
})