import React, { useContext, useState, useEffect } from "react"
import { EditorState, convertFromHTML, ContentState } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import Show from "./Show"
import { TodoContext } from "./Todo"
import { convertToHTML } from "draft-convert"

const Form = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  const { state, dispatch } = useContext(TodoContext)

  const handleSubmit = (e) => {
    let value = convertToHTML(editorState.getCurrentContent())

    if (state.isEdit) {
      updateItem(value)
    } else {
      createItem(value)
    }
    e.preventDefault()
  }

  const updateItem = (value) => {
    dispatch({
      type: "UPDATE_ITEM",
      payload: { id: state.item.id, text: `${value}` },
    })
  }
  const createItem = (value) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { id: state.todos.length + 1, text: `${value}` },
    })
  }

  useEffect(() => {
    if (state.isEdit) {
      const { contentBlocks, entityMap } = convertFromHTML(state.item.text)
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      )
      setEditorState(EditorState.createWithContent(contentState))
    }
  }, [state])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={setEditorState}
          />
        </div>
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.addButton}>
            {state.isEdit ? "Update" : "Add"}
          </button>
        </div>
      </form>
      <Show />
    </>
  )
}

const styles = {
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItem: "center",
  },
  addButton: {
    width: "25%",
    margin: "15px auto",
    padding: "10px",
  },
}
export default Form
