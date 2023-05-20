import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType="all"|"active"|"completed"

function App() {
    let [tasks1,setTasks1]=useState<Array<TaskType>>([
        {id:v1(), title:"CSS", isDone:true},
        {id:v1(), title:"HTML", isDone:true},
        {id:v1(), title:"JS", isDone:true},
        {id:v1(), title:"React", isDone:false}
    ])

    let [filter, setFilter]=useState<FilterValuesType>("all")
    let tasksForTodolist=tasks1
    if (filter==="active") tasksForTodolist=tasks1.filter((t)=>t.isDone===false)
    if (filter==="completed") tasksForTodolist=tasks1.filter((t)=>t.isDone===true)

    function changeFilter(value:FilterValuesType){
        setFilter(value)
    }

    function removeTask (id:string){
        tasks1=tasks1.filter((t)=>t.id !== id)
        setTasks1(tasks1)
    }

    function addTask(title:string){
        let newTask={id:v1(), title:title, isDone:false}
        let newTasks=[newTask, ...tasks1]
        setTasks1(newTasks)
    }

    function changeStatus(taskId:string, isDone:boolean) {
      let task=tasks1.find(t => t.id === taskId)
        if (task) {
            task.isDone=isDone;
        }
        setTasks1([...tasks1])
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn?"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
