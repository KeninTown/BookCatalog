import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import classes from '../styles/Books.module.css'
import { fetchBooks } from '../ReduxToolkit/actionCreators'
import Book from './Book'

const Books = () => {

    const dispatch = useAppDispatch()
    const { books } = useAppSelector(state => state.booksReducer)

    useEffect(() => {
        dispatch(fetchBooks())
    }, [])


    return (
        <div className={classes.booksContainer}>
            {books.map((book) => 
            <Book
            key={book.id}
            author={book.authors}
            title={book.title}
            genres={book.genre}
            img={book.img}></Book>)}
        </div>
    )
}

export default Books