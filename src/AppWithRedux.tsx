import React, { useState } from "react";
import "./App.css";
import TodoList from "./Components/TodoList";
import { TaskType } from "./Components/TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./Components/AddItemForm";
import { AppBar, IconButton, Toolbar, Container, Button, Typography, Grid, Paper } from "@mui/material";
import Menu from '@mui/icons-material/Menu';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from "./state/todolists-reducer";
import { addTaskAC, changeTaskStatuskAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./state/store";



export type FilteValuesType = "all" | "completed" | "active";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilteValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodoListType>>( state => state.todolists )
    const tasks = useSelector<AppRootState, TasksStateType>( state => state.tasks )

  function removeTask(id: string, todolistId: string) {
    dispatch(removeTaskAC(id, todolistId));
  }

  function changeFilter(value: FilteValuesType, todolistId: string) {
    dispatch(changeTodolistFilterAC(value, todolistId));
  }

  function addTask(title: string, todolistId: string) {
    dispatch(addTaskAC(title, todolistId));
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    dispatch(changeTaskStatuskAC(id, isDone, todolistId));
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    dispatch(changeTaskTitleAC(id, newTitle, todolistId));
  }

  function removeTodolist(id: string) { 
    const action = removeTodolistAC(id);
    dispatch(action);
    } 

    function changeTodolistTitle(id: string, title: string) {
        const action = changeTodolistTitleAC(id, title);
        dispatch(action)
    }

  function addTodolist(title: string) {
    const action = addTodolistAC(title);
    dispatch(action);
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
      {todolists.map((tl) => {
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


export default AppWithRedux;