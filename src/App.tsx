import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType="all"|"active"|"completed"
type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {
    let [tasks1,setTasks1]=useState<Array<TaskType>>([
        {id:v1(), title:"CSS", isDone:true},
        {id:v1(), title:"HTML", isDone:true},
        {id:v1(), title:"JS", isDone:true},
        {id:v1(), title:"React", isDone:false}
    ])

    function changeFilter(value:FilterValuesType, todolistId:string){
        let todolist=todolists.find(tl=>tl.id === todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
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

    let [todolists, setTodolists] = useState <Array<TodolistType>>([
        {id: v1(), title: "What to learn?", filter: "active"},
        {id: v1(), title: "What to buy?", filter: "completed"}
    ])

    return (
        <div className="App">
            {
                todolists.map(tl=>{
                    let tasksForTodolist=tasks1
                    if (tl.filter==="active") tasksForTodolist=tasks1.filter((t)=>t.isDone===false)
                    if (tl.filter==="completed") tasksForTodolist=tasks1.filter((t)=>t.isDone===true)
                    return   <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
