import { icon_check, icon_delete, icon_edit } from '@/public'
import Image from 'next/image'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodo, editTitle, toggleCompleted } from '../redux/todoSlice'

const TodoItem = ({id, title, completed, className, setInput, input}) => {
  const dispatch = useDispatch()
  return (
    <div className={`px-6 py-4 text-light-blue-500 flex gap-6 items-center justify-between border-b border-light-blue-300 ${className}`}>
      <div className="flex gap-3 items-center">
        <div
          onClick={() => dispatch(toggleCompleted({id}))}
          className={`border border-light-blue-300 rounded-full cursor-pointer text-center
          ${completed ? 'accent-bg py-1 px-0.5' : 'p-2'}`}
        >
          {completed && <Image src={icon_check} alt="check icon" />}
        </div>
        <p className='max-sm:text-sm'>{title}</p>
      </div>
      <div className='cursor-pointer items-center flex gap-2'>
        <Image onClick={() => { setInput(title); dispatch(deleteTodo({id})) }} width={14} height={14} src={icon_edit} alt="edit icon" />
        <Image onClick={() => dispatch(deleteTodo({id}))} width={14} height={14} src={icon_delete} alt="delete icon" />
      </div>
    </div>
  )
}

export default TodoItem