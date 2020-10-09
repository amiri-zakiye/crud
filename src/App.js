import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import loading from './loading2.gif'
import './App.css';
import ListItem from './ListItem'

class App extends Component {
  constructor(){
    super();
    this.state = {
      newTodo : '',
      editting : false ,
      edittingIndex : null,
      notification : null ,
      todos : [] ,
      loading : true
    };

    this.apiUrl = 'https://5f7e0c80834b5c0016b06ecb.mockapi.io';
    
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }
  //life cycle hooks
  async componentDidMount(){
    const response = await axios.get(`${this.apiUrl}/todos`);
    setTimeout(() => {
      this.setState({
        todos : response.data ,
        loading : false
      });
    } , 1000);
   
  }

  handleChange(event){
    this.setState({
      newTodo : event.target.value
    });
  }


  async addTodo(){
    const response = await axios.post(`${this.apiUrl}/todos`,{
      name : this.state.newTodo
    });
  
   
    const todos = this.state.todos;
    todos.push(response.data);

    this.setState({
      todos : todos,
      newTodo : ''
    });
    alert('Todo added successfully!')
  }

  async deleteTodo(index){

    const todos = this.state.todos;
    const todo = todos[index];
    await axios.delete(`${this.apiUrl}/todos/${todo.id}`);
    delete todos[index];
    this.setState({todos});

    alert('Todo deleted successfully!')
  }

  editTodo(index){
    const todo = this.state.todos[index];
    this.setState({
      editting : true ,
      newTodo : todo.name,
      edittingIndex : index
    });
  }

  async updateTodo(){

    const todo = this.state.todos[this.state.edittingIndex];
    const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`,{
      name : this.state.newTodo
    });

    const todos = this.state.todos;
    todos[this.state.edittingIndex] = response.data;

    this.setState({
      editting : false ,
      edittingIndex : null ,
      newTodo : '',
      todos : todos
    });

    alert('Todo updated successfully!')
  }


    alert(notification){

      this.setState({
        notification : notification
      });

      setTimeout(() => {
        this.setState({
          notification : null
        });
      },3000);
    
  }

  render(){

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <div className="container">

          {
            this.state.notification && 
            <div className = "alert alert-info mt-3">
              {this.state.notification}
            </div>
          }

          <input 
            onChange={this.handleChange} 
            className = "my-4 form-control" 
            type ="text" 
            placeholder="add new todo" 
            value={this.state.newTodo}
           />

          <button 
            onClick = {this.state.editting ? this.updateTodo : this.addTodo} 
            className = "btn btn-info form-control  mb-3"
            disabled = {this.state.newTodo.length < 5}>
            {this.state.editting ? 'Update todo' : 'ADD todo'}
          </button>

          {
            this.state.loading &&
             <img src = {loading} alt = ""/>
          }


         {
          (!this.state.editting || this.state.loading)  &&
          <ul className = "list-group">
          {this.state.todos.map((item,index) => {
            return <ListItem 
                
                key = {item.id}   
                item = {item}
                editTodo = {() => {this.editTodo(index);}}
                deleteTodo = {() => {this.deleteTodo(index);}}

            />;
          })}
          </ul>
         }
         </div>
      </div>
    );
  }
}

export default App;
