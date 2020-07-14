import React from 'react';


const TodoItem = (props) => {
    const clickHandler =(e)=> {
        const status = e.target.checked;
        props.setAllTodos([...props.allTodos.map(i=> {
            if(i.todo === props.todo){
                return {todo:i.todo, done:status}
            }
        return i;
        })]);
    };

  return(
      <div>
          <label>
              <input type="checkbox" checked={props.done} onChange={clickHandler} />
              <span className={props.done ? 'todoText done' : 'todoText'}>{props.todo}</span>
          </label>
      </div>
  )
};


export default TodoItem;