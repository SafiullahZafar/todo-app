import { useState } from 'react'
import Navebar from './components/Navebar'
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

function App() {
  const [todo, settodo] = useState("")

  const [todos, settodos] = useState([])

  const [showfinished, setshowfinished] = useState(true)

const [hasLoaded, setHasLoaded] = useState(false)

useEffect(() => {
  let todoString = localStorage.getItem("todos")
  if (todoString) {
    let todos = JSON.parse(todoString)
    settodos(todos)
  }
  setHasLoaded(true)
}, [])

useEffect(() => {
  if (hasLoaded) {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
}, [todos, hasLoaded])

  

  const savetols=() => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  
  const togglefinished=() => {
    setshowfinished(!showfinished)
  }
  

  const handleedit = (e,id) => {
    let t=todos.filter(i=>i.id===id)
    settodo(t[0].todo)
     let newtodos=todos.filter(item => {
     return item.id!==id
   })
   settodos(newtodos)
   savetols()
  }

  const handledelete = (e,id) => {
   let newtodos=todos.filter(item => {
     return item.id!==id
   })
   settodos(newtodos)
   savetols()
  }

  const handleadd = () => {
    settodos([...todos, {id:uuidv4(), todo, iscompleted: false }])
    settodo("")
    savetols()
  }

  const handlechange = (e) => {
    settodo(e.target.value)
    savetols()

  }

  const handlechackbox=(e) => {
   let id= e.target.name;
   let index=todos.findIndex(item => {
     return item.id===id;
   }
   )
   let newtodos=[...todos]
   newtodos[index].iscompleted =!newtodos[index].iscompleted
   settodos(newtodos)
   savetols()
  }
  


  return (
    <>
      <Navebar />
      <div className="container my-5 bg-violet-300 p-4 w-1/2 mx-auto  rounded-xl min-h-[85vh]">
      <h1 className='font-bold text-center text-xl'>iTask - Manage your todos at one place</h1>
        <div className="addtodo my-5 flex flex-col gap-2">
          
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handlechange} value={todo} type="text" className='w-full rounded-md border-2 border-violet-950' />
          <button onClick={handleadd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 p-2 px-3 hover:cursor-pointer text-sm font-bold py-1 rounded-md mx-32 flex justify-center items-center text-white'>Save</button>
        </div>
        <input onChange={togglefinished} type="checkbox" checked={showfinished} name="" id="" />Show Finished
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length===0 && <div className='m-5 font-semibold bg-violet-400 transition-all border-[2px] border-blue-800 px-3 py-1 rounded-md cursor-pointer text-gray-800'>No Todos to display</div>}
          {todos.map(item => {
            return (showfinished  || !item.iscompleted) && <div key={item.id} className="todo flex w-11/12 justify-between my-3">
              <input className='mx-2' onChange={handlechackbox} type="checkbox" checked={item.iscompleted} name={item.id} id="" />
             <div className={`${item.iscompleted ? "line-through" : ""} relative w-[400px]`}>{item.todo}</div>
              <div className="buttons flex h-full mx-3 ">
                <button onClick={(e)=>handleedit(e,item.id)} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 p-2 px-3 text-sm font-bold py-1 rounded-md mx-1 text-white'>Edit</button>
                <button onClick={(e) => {
                 handledelete(e,item.id) 
                }
                 } className='bg-violet-800 hover:bg-violet-950 p-2 px-3 text-sm font-bold py-1 rounded-md mx-1 text-white'>Delete</button>
              </div>
            </div>
          }
          )}
        </div>
      </div>
    </>
  )


}

export default App
