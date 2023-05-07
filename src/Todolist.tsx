import React from "react";
import {stringify} from "querystring";
import {FilterValuesType} from "./App";

type TodolistPropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (id:number)=>void
    changeFilter: (arg0: FilterValuesType)=>void
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
                {props.tasks.map((el,index)=>{
                    return (
                        <li key={el.id}><input type="checkbox" checked={el.isDone}/><span>{el.title}</span>
                            <button onClick={()=>{props.removeTask(el.id)}}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={()=>props.changeFilter("all")}>All</button>
                <button onClick={()=>props.changeFilter("active")}>Active</button>
                <button onClick={()=>props.changeFilter("completed")}>Completed</button>
            </div>

        </div>
    );
}