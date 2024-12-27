import React from "react";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import { IconButton } from "@mui/joy";
import '@mui/material/styles';
import { TextField } from "@mui/material";
import { ControlPoint } from "@mui/icons-material";



type AddItemFormPropsType = {
    addItem: (title: string) => void
  }
  
export  function AddItemForm(props: AddItemFormPropsType) {
  
    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);
  
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      setError(null);
      if (e.charCode === 13) {
        addTask();
    }
  }
  const addTask = () => {
    if (title.trim() !== "") {
      props.addItem(title.trim());
      setTitle("");
    } else {
      setError("Title is required")
    }
  }
  
    return (
    <div>
         <TextField value={title} 
                variant={"outlined"}
                label={"Type value"}
                onChange={ onChangeHandler } 
                onKeyPress={ onKeyPressHandler } 
                error={!!error} 
                helperText={error}
         />
          <IconButton onClick={addTask} variant={'soft'} color={'primary'}>
            <ControlPoint />
          </IconButton>
        </div>
    )
  }

  