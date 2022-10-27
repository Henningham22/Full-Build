import {useState, useEffect} from 'react';

const API_BASE = "http://localhost:3001";

function App() {
    const [todos, setTodos] = useState([]);
    const [popupActive, setPopupActive] = useState(false);
    const [newTodo, setNewTodo] = useState("");
    
    useEffect(() => {
        GetTodos();

        console.log(todos);
    }, [])

    const GetTodos = () => {
        fetch(API_BASE + "/todos")
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error("Error: ",err));
    }

    const deleteTodo = async id => {
        const data = await fetch(API_BASE + "/todo/delete/" + id, {
            method: "DELETE"
        }).then(res => res.json());

        setTodos(todos => todos.filter(todo => todo._id !== data._id))
    }
        const addTodo = async () => {
            const data = await fetch(API_BASE + "/todo/new", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    text: newTodo
                })
            }).then(res => res.json());

            console.log(data);

            setTodos([...todos, data]);
            setPopupActive(false);
            setNewTodo("");
        }

    return (
      <div className="App">
          
          <h1>Shopping Market</h1>
        <div>
            <img src='data:image/jpeg;base64,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'/>
        </div>
          <br/>
          <h4>Shopping List</h4>
  
      <br/>
      <br/>
      
      
          <div className= "todos">
              <div className="todo">
                  <div className="checkbox"></div>
  
                  <div className="text"> Bread </div>
  
                  <div className="delete-todo" onClick={() => deleteTodo
                (todos._id)}>x</div>
              </div>
              <div className="todo">
                  <div className="checkbox"></div>
  
                  <div className="text"> Milk </div>
  
                  <div className="delete-todo">x</div>
              </div>
              
          </div>

          <div className= "addPopup" onClick={() => setPopupActive(true)}>+</div>

          {popupActive ? (
              <div className="popup">
                  <div className= "closePopup" onClick={() => setPopupActive
                (false)}>x</div>
                <div className="content">
                    <h3> Add Items</h3>
                    { newTodo }
                    <input type="text" className="add-todo-input" 
                    onChange={e => setNewTodo(e.target.value)}
                    value={newTodo} />
                    <div className="button" onClick={addTodo}>Add Items</div>
                </div>
              </div>
          ) : ''}
      </div>
    );
  }
  
  export default App;
  