import { FC } from "react"
import { Image } from "../ReduxToolkit/bookSlice";
import classes from '../styles/Book.module.css'
import cat from '../assets/cat.jpeg'

export interface BookProps {
    author: string[],
    title: string,
    genres: string[];
    img: Image;
}

const Book: FC<BookProps> = ({author, title, genres, img }) => {
    return (
        <div className={classes.bookContainer}>
            <div className={classes.imageContainer}>
                {img.thumbnail ? <a href="#"><img className={classes.image} src={img.thumbnail} alt="Картинка не прогрузилась"></img></a> : <a href="#"><img className={classes.image} src={cat} alt="Картинка не прогрузилась"></img></a>}
            </div>
            <div className={classes.bodyContainer}>
                <div className={classes.titleContainer}>
                    <a href="#">{title}</a>
                </div>
                <div className={classes.authorContainer}>
                   {(author && author.length) ? <a href="#">{author[0]}</a> :  <a href="#">{author}</a>}
                </div>
            </div>
            <div className={classes.bookButtonContainer}>
                <button className={classes.bookButton}>Хочу почитать</button>
            </div>
        </div>
    )
}

export default Book