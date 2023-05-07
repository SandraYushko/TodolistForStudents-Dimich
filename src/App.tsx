import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType="all"|"active"|"completed"

function App() {
    let [tasks1,setTasks1]=useState<Array<TaskType>>([
        {id:1, title:"CSS", isDone:true},
        {id:2, title:"HTML", isDone:true},
        {id:3, title:"JS", isDone:true},
        {id:4, title:"React", isDone:false}
    ])

    let [filter, setFilter]=useState<FilterValuesType>("all")
    let tasksForTodolist=tasks1
    if (filter==="active") tasksForTodolist=tasks1.filter((t)=>t.isDone===false)
    if (filter==="completed") tasksForTodolist=tasks1.filter((t)=>t.isDone===true)

    function changeFilter(value:FilterValuesType){
        setFilter(value)
    }

    function removeTask (id:number){
        tasks1=tasks1.filter((t)=>t.id !== id)
        setTasks1(tasks1)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn?"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
