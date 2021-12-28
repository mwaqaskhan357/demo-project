import React, { useContext } from "react"
import DOMPurify from "dompurify"
import { TodoContext } from "./Todo"

const List = ({ todo }) => {
  const { dispatch } = useContext(TodoContext)

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    }
  }

  const handleDelete = () => {
    dispatch({ type: "DELETE_ITEM", payload: todo.id })
  }

  const handleEdit = () => {
    dispatch({ type: "EDIT_ITEM", payload: todo })
  }

  return (
    <div
      className="preview"
      dangerouslySetInnerHTML={createMarkup(todo.text)}
      onDoubleClick={handleDelete}
      style={styles.listItem}
      onClick={handleEdit}
    ></div>
  )
}

const styles = {
  listItem: {
    cursor: "pointer",
  },
}

export default List
