import React from 'react'

const listItem = (props) => {

        return <li key = {props.item.id} className="list-group-item">
            {props.item.name}
            <button 
            onClick = {props.deleteTodo} 
            className="btn btn-danger btn-small ml-4">x
            </button>
            <button 
            onClick = {props.editTodo} 
            className="btn btn-warning btn-small ml-4">U
            </button>
        </li>;

}
export default listItem

