import React, { useState } from "react";
import "./App.css";
import TodoList from "./Components/TodoList";
import { TaskType } from "./Components/TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./Components/AddItemForm";
import { AppBar, IconButton, Toolbar, Container, Button, Typography, Grid, Paper } from "@mui/material";
import Menu from '@mui/icons-material/Menu';



export type FilteValuesType = "all" | "completed" | "active";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilteValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todoLists.filter(tl => tl.id !== todolistId)
    setTodoLists(filteredTodolist);
    delete tasksObj[todolistId];
    setTasks({...tasksObj})
  }

  const [tasksObj, setTasks] = useState<TasksStateType>({
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
    const filteredTasks = tasksObj[todolistId].filter((t) => t.id !== id);
    setTasks({ ...tasksObj, [todolistId]: filteredTasks });
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    const todolist = todoLists.find(tl => tl.id === id);
    if (todolist) {
      todolist.title = newTitle;
      setTodoLists([...todoLists])
    }
  }

  function changeFilter(value: FilteValuesType, todolistId: string) {
    setTodoLists(
      todoLists.map((tl) => (tl.id === todolistId ? { ...tl, filter: value } : tl))
    );
  }

  function addTask(title: string, todolistId: string) {
    const newTask = { id: v1(), title, isDone: false };
    const newTasks = [newTask, ...tasksObj[todolistId]];
    setTasks({ ...tasksObj, [todolistId]: newTasks });
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    const updatedTasks = tasksObj[todolistId].map((t) =>
      t.id === taskId ? { ...t, isDone } : t
    );
    setTasks({ ...tasksObj, [todolistId]: updatedTasks });
  }

  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    const updatedTasks = tasksObj[todolistId].map((task) =>
      task.id === taskId ? { ...task, title: newTitle } : task // Изменяем только title
    );
    setTasks({ ...tasksObj, [todolistId]: updatedTasks }); // Обновляем состояние
  }

  function addTodolist(title: string) {
    let todolist: TodoListType = {
      id: v1(),
      filter: "all",
      title: title
    }
    setTodoLists([todolist, ...todoLists]);
    setTasks({
      ...tasksObj,
      [todolist.id]: []
    })
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
        let tasksForTodoList = tasksObj[tl.id];

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
  );
}

export default App;
