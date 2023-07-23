import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {
    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }
    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTask = tasks.filter((t) => t.id !== id)
        tasksObj[todolistId] = filteredTask
        setTasksObj({...tasksObj})
    }
    function addTask(title: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let newTask = {id: v1(), title: title, isDone: false}
        tasksObj[todolistId] = [newTask, ...tasks]
        setTasksObj({...tasksObj})
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
            setTasksObj({...tasksObj})
        }
    }
    function removeTodolist(todolistId: string) {
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
        let filterTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists([...filterTodolists])
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn?', filter: 'active'},
        {id: todolistId2, title: 'What to buy?', filter: 'completed'}
    ])

    let [tasksObj, setTasksObj] = useState({
        [todolistId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Button', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
        ]
    })

    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let tasksForTodolist = tasksObj[tl.id]
                    if (tl.filter === 'active') tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === false)
                    if (tl.filter === 'completed') tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === true)
                    return <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }
        </div>
    );
}

export default App;
