"use client"

import React, { useEffect, useState } from 'react'
import Header from './header';
import TaskList from './taskList';
import SearchBar from './searchBar';

const priorityOrder = { high: 1, medium: 2, low: 3 };


function RootComponent({initialTasks}) {
    
    const [tasks , setTasks] = useState(initialTasks );
    const [hasMounted, setHasMounted] = useState(false);
   

    const [searchOuery , setSearchQuery] = useState("");
    const [searchedTasks , setSearchedTasks] = useState([]);
    const [isSearching , setIsSearching] = useState(false);
   


    useEffect(() => {
      setHasMounted(true); 

      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
      } 
  }, []);
   



    useEffect(() => {
      if(hasMounted){

        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    } , [tasks , hasMounted])

    const addTask = (newTask) => {
        setIsSearching(false);
        setSearchedTasks([]);
        setSearchQuery("");
        
        setTasks([...tasks, { ...newTask, id: tasks.length + 1, completed: false }]);
      };

      const deleteTask = (taskId) => {
        setIsSearching(false);
        setSearchedTasks([]);
        setSearchQuery("");
        
        setTasks(tasks.filter(task => task.id !== taskId));
      };

      const filterAndSortTasks = () => {
        tasks.sort((a, b) => {
            
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1; 
            }
            
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        })
      }
      const updateTask = (taskId, updatedFields) => {
        setIsSearching(false);
        setSearchedTasks([]);
        setSearchQuery("");
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, ...updatedFields } : task
        ));
    };

      filterAndSortTasks();

      function getSearchQuery(query){
        setSearchQuery(query)
        if(query === ""){
            setIsSearching(false);
        }else{

            setIsSearching(true);
        }
        if(searchOuery === ''){
            console.log("here")
            const result = tasks.filter(task =>
                task.title.toLowerCase().includes(query.toLowerCase()) ||
                task.description.toLowerCase().includes(query.toLowerCase())
              );
              setSearchedTasks(result)
        
        }
        if(searchOuery.length < query.length && searchOuery.length > 0){
            const result = searchedTasks.filter(task =>
                task.title.toLowerCase().includes(query.toLowerCase()) ||
                task.description.toLowerCase().includes(query.toLowerCase())
              );
              setSearchedTasks(result)
        }else{
            const result = tasks.filter(task =>
                task.title.toLowerCase().includes(query.toLowerCase()) ||
                task.description.toLowerCase().includes(query.toLowerCase())
              );
              setSearchedTasks(result)
        }
      }

      if (!hasMounted) {
       
        return null;
    }

  return (
    <>
    <SearchBar  OnSearch={getSearchQuery} />
      <Header addTask={addTask} />
      <main>

      {tasks.length > 0 && <TaskList sortedTasks={isSearching ? searchedTasks : tasks} deleteTask={deleteTask} updateTask={updateTask} />}
      {tasks.length === 0 && <main>No Tasks , Take a Coffee Break</main>}
      {searchedTasks.length === 0 && isSearching && <main>No Tasks Found</main>}
      </main>
    </>
  )
}

export default RootComponent


