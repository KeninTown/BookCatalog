import axios from 'axios';
import { AppDispatch } from './store';
import { BooksProps, booksSlice } from './bookSlice';

export const fetchBooks = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(booksSlice.actions.booksFetching())
        const response = await axios.get<BooksProps[]>('/api/books?amount=30')
        console.log(response)
        dispatch(booksSlice.actions.booksFetchingSucces(response.data))
    } catch (error: any) {
        dispatch(booksSlice.actions.booksFetchingError(error.message))
    }
}