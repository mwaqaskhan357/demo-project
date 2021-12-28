import React, { useReducer } from "react"
import { todoReducer } from "../reducers/todoReducer"
import Form from "./Form"

export const TodoContext = React.createContext()

const Todo = () => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [{ id: 1, text: "First list" }],
    isEdit: false,
  })
  return (
    <div style={styles.todoApp}>
      <TodoContext.Provider value={{ state, dispatch }}>
        <Form />
      </TodoContext.Provider>
    </div>
  )
}

const styles = {
  todoApp: {
    width: "100%",
    maxWidth: "1024px",
    margin: "15px auto",
  },
}

export default Todo
