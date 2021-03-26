import { useState } from "react"
import { useInput } from "../hooks/useInput"
import { motion } from "framer-motion"
import { FaPencilAlt } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import Dashboard from "./Dashboard";

const Todo = ({ todo, deleteTodo, updateTodo, dragStart, dashboard }) => {

  const [ isEdited, setIsEdited ] = useState(false)
  const { reset: resetTitle, ...title } = useInput("")
  const { reset: resetDesc, ...desc } = useInput("")

  const toggle = () => {
    setIsEdited(!isEdited)
    resetTitle(todo.title)
    resetDesc(todo.description)
  }

  const update = () => {
    updateTodo(todo.id, title.value, desc.value)
    toggle()
  }

  return (
    <article draggable='true' onDragStart={(e) => dragStart(e, dashboard.id, todo.id)}>
      <FaTrash className='trashIcon' onClick={() => deleteTodo(todo.id)}/> 
      { isEdited ?
        <motion.div>
          <input { ...title }/>
          <input { ...desc } />
          <div className='toDoEditBtn'>
          <FaUndoAlt className='undoIcon'onClick={toggle}/>
          <FaSave className='saveIcon'onClick={update}/> 
          </div>
        </motion.div> :
          <>
        <div>
          <h3>{ todo.title }</h3>
          <p>{ todo.description }</p>
        </div>
      <FaPencilAlt className='pencilIcon' onClick={toggle}/> 
      </>}
    </article>
  )
}

export default Todo
