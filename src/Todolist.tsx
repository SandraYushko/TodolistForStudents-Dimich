import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

type TodolistPropsType = {
    todolistId: string,
    title: string,
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (arg0: FilterValuesType, todolistId:string) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId:string, isDone:boolean)=>void
    filter: FilterValuesType
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export function Todolist(props: TodolistPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onClickButtonHandler = () => {
        if (newTaskTitle.trim() !==""){
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle("")
        } else {
            setError("Title is required")
        }
    }
    const onKeyDownInputHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }
    const onClickButtonAllHandler = () => {
        props.changeFilter("all", props.todolistId)
    }
    const onClickButtonActiveHandler = () => {
        props.changeFilter("active", props.todolistId)
    }
    const onClickButtonCompletedHandler = () => {
        props.changeFilter("completed", props.todolistId)
    }
    const mappedTasks=props.tasks.map((el) => {
        const onClickHandler=()=>{ props.removeTask(el.id)}
        const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{props.changeTaskStatus(el.id, e.currentTarget.checked)}

        return (
            <li key={el.id} className={el.isDone?'is-done':""}>
                <input type="checkbox" checked={el.isDone} onChange={onChangeHandler}/>
                <span>{el.title}</span>
                <button onClick={onClickHandler}>x</button>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <input
                value={newTaskTitle}
                onChange={onChangeInputHandler}
                onKeyDown={onKeyDownInputHandler}
                className={error?'error':""}
            />
            <button onClick={onClickButtonHandler}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
            <ul>
                {mappedTasks}
            </ul>
            <div>
                <button className={props.filter==="all"?'active-filter':""}
                        onClick={onClickButtonAllHandler}>All</button>
                <button className={props.filter==="active"?'active-filter':""}
                        onClick={onClickButtonActiveHandler}>Active</button>
                <button className={props.filter==="completed"?'active-filter':""}
                        onClick={onClickButtonCompletedHandler}>Completed</button>
            </div>
        </div>
    );
}