import React from "react";
import {stringify} from "querystring";

type TodolistPropsType = {
    title: string,
    tasks: Array<TaskType>
}

export type TaskType={
    id: number,
    title: string,
    isDone: boolean
}

export function Todolist(props:TodolistPropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <input/>
            <button>+</button>
            <ul>
                <li><input type="checkbox" checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[3].isDone}/><span>{props.tasks[3].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>

        </div>
    );
}