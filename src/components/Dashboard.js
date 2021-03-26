import { useState } from 'react'
import { useInput } from '../hooks/useInput'
import Todo from './Todo'
import { FaPencilAlt } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";


const Dashboard = ({ dashboard, deleteDashboard, renameDashboard, addTodo, deleteTodo, updateTodo, dragStart, dragOver, drop }) => {

  const [ isEdited , setIsEdited ] = useState(false)
  const { reset: resetDashBoard, ...dashboardTitle } =  useInput(dashboard.title)

  const [ todoFormShown, setTodoFormShown ] = useState(false)
  const { reset: resetTitle, ...todoTitle } = useInput("")
  const { reset: resetDescription, ...todoDescription } = useInput("")

  const toggle = () => {
    setIsEdited(!isEdited)
    resetDashBoard(dashboard.title)
  }

  const toggleTodoCreator = () => {
    setTodoFormShown(!todoFormShown)
    resetTitle()
    resetDescription()
  }

  const save = () => {
    renameDashboard(dashboard.id, dashboardTitle.value)
    toggle()
  }

  const saveTodo = () => {
    addTodo(dashboard.id, todoTitle.value, todoDescription.value)
    toggleTodoCreator()
  }

  const deleteTodoFromDashboard = (todoId) => {
    deleteTodo(dashboard.id, todoId)
  }

  const updateTodoInDashboard = (todoId, title, desc) => {
    updateTodo(dashboard.id, todoId, title, desc)
  }

  return (
    <section onDrop={(e) => drop(e, dashboard.id)}  onDragOver={(e) => dragOver(e)} key={dashboard.id}>
      <div className='buttonContainer'>
       { isEdited ? <FaUndoAlt onClick={toggle}/> : <FaPencilAlt onClick={toggle}/> }
      { isEdited && <FaSave onClick={save}/>}</div>
      <div className='dashBoardInputContainer'>
        <div className='dashboardHeader'>
      { isEdited ?
        <input placeholder={ dashboard.title }className='dashboardEdit' { ...dashboardTitle } /> :
        <h2>{ dashboard.title }</h2> }
      </div>
        </div>
      <div className='toDoSection'>
      { dashboard.todos.map(todo =>
        <Todo
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodoFromDashboard}
          updateTodo={updateTodoInDashboard}
          dragStart={dragStart}
          dashboard={dashboard}
          />
      ) }
      { todoFormShown ?
        <div className='toDoContainer'>
          <input placeholder='Title'className='toDoTitle'{ ...todoTitle } />
          <input placeholder='Description'className='toDoDesc'{ ...todoDescription } />
          <div className='btnToDoContainer'>
          <FaUndoAlt onClick={toggleTodoCreator}/>
          <FaPlusCircle onClick={saveTodo}/>
         
          </div>
        </div> :
      <button className='btnNewToDo' onClick={toggleTodoCreator}>New todo</button>
      }
      </div>
      <FaTrash className='trashIcon'onClick={() => deleteDashboard(dashboard.id)}/>
    </section>
  );
}

export default Dashboard;
