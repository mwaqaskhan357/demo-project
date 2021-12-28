import * as Types from "../reducers/Types"

export const todoReducer = (state, action) => {
  switch (action.type) {
    case Types.ADD_ITEM:
      return { todos: [...state.todos, { ...action.payload }], isEdit: false }
    case Types.DELETE_ITEM:
      return {
        todos: state?.todos.filter((item) => item.id !== action.payload),
        isEdit: false,
      }
    case Types.EDIT_ITEM:
      return {
        ...state,
        isEdit: true,
        item: action.payload,
      }
    case Types.UPDATE_ITEM:
      return {
        todos: state?.todos.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload
          }
          return item
        }),
        isEdit: false,
      }
    default:
      return state
  }
}
