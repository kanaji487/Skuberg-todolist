import React from 'react'

type Props = {}

const TodoInput = (props: Props) => {
  return (
    <div className=''>
        <input type='text' name='todo'  placeholder='create new todolist'>
            <button className='bg-blue-500 text-white px-3 py-2 rounded' >Add</button>
        </input>
    </div>
  )
}

export default TodoInput;