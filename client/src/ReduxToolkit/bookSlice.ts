import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Image {
    smallThumbnail: string;
    thumbnail: string;
}

export interface BooksProps {
    id: string;
    authors: string[];
    genre: string[];
    title: string;
    img: Image;
}

interface BooksState {
    books: BooksProps[];
    isLoading: boolean;
    error: string;
}

const initialState:BooksState = {
    books: [],
    isLoading: false,
    error: '',
}

export const booksSlice = createSlice({
    name: 'books', // уникальное имя слайса
    initialState, // дефолтное состояние 
    reducers: { // редюсеры, типо свитч кэйс
        booksFetching(state) {
            state.isLoading = true;
        },
        booksFetchingSucces(state, action: PayloadAction<BooksProps[]>) {
            state.isLoading = false;
            state.error = ''
            state.books = action.payload
        },
        booksFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export const {} = booksSlice.actions

export default booksSlice.reducer