import { TextField } from "@mui/material";
import React, { ChangeEvent } from "react";
import { useState } from "react";

type EditableSpanPropsType = {
    title: string
    editMode?: boolean
    onChange: (newValue: string) => void
  }
  
  function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState("");

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    };
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    };
    const onChangeTitleHnadler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value); 

    return props.editMode
        ? <TextField value={title} onChange={onChangeTitleHnadler} onBlur={activateViewMode} autoFocus />
        : <span onDoubleClick={activateEditMode}>{props.title} - {title}</span>
  }

  export default EditableSpan