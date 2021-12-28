import React, { useContext } from "react"
import { TodoContext } from "./components/Todo"
import List from "./components/List"

const SHow = () => {
  const todos = useContext(TodoContext)
  const todo_list = todos?.state?.todos.map((todo) => {
    return <List key={todo.id} todo={todo} />
  })
  return <div style={styles.todoList}>{todo_list}</div>
}

const styles = {
  todoList: {
    width: "100%",
    maxWidth: "1024px",
    margin: "15px auto",
    border: "1px solid #ccc",
    padding: "15px",
  },
}
export default SHow
