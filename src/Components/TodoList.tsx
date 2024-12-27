import React, { ChangeEvent, KeyboardEvent } from "react";
import { FilteValuesType } from "../App";
import { useState } from "react";
import { AddItemForm } from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import { Checkbox, IconButton } from "@mui/material"
import Delete from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";


export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilteValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
  filter: FilteValuesType;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (todolistId: string, newTitle: string) => void;
};

export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const onAllClichHandler = () => props.changeFilter("all", props.id);
  const onActiveClichHandler = () => props.changeFilter("active", props.id);
  const onCompletedClichHandler = () => props.changeFilter("completed", props.id);
  const removeTodolist = () => {
    props.removeTodolist(props.id);
  }

  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  }

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  }

  return (
    <div>
      <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle}/> 
        <IconButton onClick={removeTodolist}>
          <Delete />
        </IconButton>


      </h3>
      <AddItemForm addItem={addTask}/>
      <div>
        {
          props.tasks.map(t => {

            const onRemoveHandler = () => {props.removeTask(t.id, props.id);}
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
            };
            const onChangeTitleHandler = (newValue: string) => {
              props.changeTaskTitle(t.id, newValue, props.id);
            };

          return (
            <div key={t.id} className={t.isDone === true ? "is-done" : ""}>
              <Checkbox
                    onChange={onChangeStatusHandler}
                    checked={t.isDone} 
                    />
              <EditableSpan title={t.title}
                            onChange={onChangeTitleHandler}
              />
              <IconButton onClick={onRemoveHandler}>
          <Delete />
        </IconButton>
            </div>
          );
              })
            }
      </div>
      <div>
        <Button variant={props.filter === 'all' ? "contained" : "text"} 
                onClick={onAllClichHandler}>All</Button>
        <Button color={'primary'} variant={props.filter === 'active' ? "contained" : "text"}
                onClick={onActiveClichHandler}>Active</Button>
        <Button color={'secondary'} variant={props.filter === 'completed' ? "contained" : "text"} 
                onClick={onCompletedClichHandler}>Completed</Button>
      </div>
    </div>
  );
}


export default TodoList;
