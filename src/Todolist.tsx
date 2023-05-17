import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

type TodolistPropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (arg0: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export function Todolist(props: TodolistPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onClickButtonHandler = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle("")
    }
    const onKeyDownInputHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }
    const onClickButtonAllHandler = () => {
        props.changeFilter("all")
    }
    const onClickButtonActiveHandler = () => {
        props.changeFilter("active")
    }
    const onClickButtonCompletedHandler = () => {
        props.changeFilter("completed")
    }
    const mappedTasks=props.tasks.map((el) => {

        return (
            <li key={el.id}>
                <input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>
                <button onClick={() => {
                    props.removeTask(el.id)
                }}>x
                </button>
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
            />
            <button onClick={onClickButtonHandler}>+</button>
            <ul>
                {mappedTasks}
            </ul>
            <div>
                <button onClick={onClickButtonAllHandler}>All</button>
                <button onClick={onClickButtonActiveHandler}>Active</button>
                <button onClick={onClickButtonCompletedHandler}>Completed</button>
            </div>
        </div>
    );
}