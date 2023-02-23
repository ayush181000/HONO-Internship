import { configureStore } from '@reduxjs/toolkit'
import { authorReducer } from "./redux/author/reducer"
import { bookReducer } from "./redux/books/reducer"

export default configureStore({
    reducer: { books: bookReducer, authors: authorReducer },
})