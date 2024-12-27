import React, { useState } from "react";
import "./App.css";
import TodoList from "./Components/TodoList";
import { TaskType } from "./Components/TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./Components/AddItemForm";
import { AppBar, IconButton, Toolbar, Container, Button, Typography, Grid, Paper } from "@mui/material";
import Menu from '@mui/icons-material/Menu';
import { useReducer } from "react";
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from "./state/todolists-reducer";
import { addTaskAC, changeTaskStatuskAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./state/tasks-reducer";



export type FilteValuesType = "all" | "completed" | "active";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilteValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithReducers() {
    let todolistId1 = v1();
    let todolistId2 = v1();

  let [todoLists, dispatchToTodoListsReducer] = useReducer(todolistsReducer, [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todoLists[0].id]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
    ],
    [todoLists[1].id]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Milk", isDone: true },
    ],
  });

  function removeTask(id: string, todolistId: string) {
    dispatchToTasksReducer(removeTaskAC(id, todolistId));
  }

  function changeFilter(value: FilteValuesType, todolistId: string) {
    dispatchToTodoListsReducer(changeTodolistFilterAC(value, todolistId));
  }

  function addTask(title: string, todolistId: string) {
    dispatchToTasksReducer(addTaskAC(title, todolistId));
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    dispatchToTasksReducer(changeTaskStatuskAC(id, isDone, todolistId));
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    dispatchToTasksReducer(changeTaskTitleAC(id, newTitle, todolistId));
  }

  function removeTodolist(id: string) { 
    const action = removeTodolistAC(id);
    dispatchToTasksReducer(action);
    dispatchToTodoListsReducer(action);
    } 

    function changeTodolistTitle(id: string, title: string) {
        const action = changeTodolistTitleAC(id, title);
        dispatchToTodoListsReducer(action)
    }

  function addTodolist(title: string) {
    const action = addTodolistAC(title);
    dispatchToTasksReducer(action);
    dispatchToTodoListsReducer(action);
    }
  

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={ { padding: "20px" } }>
      <AddItemForm addItem={(title: string) => { addTodolist(title) }} />
        </Grid>
        <Grid container spacing={3}>
      {todoLists.map((tl) => {
        let tasksForTodoList = tasks[tl.id];

        if (tl.filter === "completed") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone);
        }
        if (tl.filter === "active") {
          tasksForTodoList = tasksForTodoList.filter((t) => !t.isDone);
        }

        return <Grid item>
          <Paper style={ { padding: "10px" } }>
          <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            changeTaskTitle={changeTaskTitle}
            filter={tl.filter}
            removeTodolist={removeTodolist}
            changeTodolistTitle={changeTodolistTitle}
          />
          </Paper>
        </Grid>
      })}
        </Grid>
      </Container>

    </div>
  )}


export default AppWithReducers;
