import Books from '../components/Books'
import Filter from '../components/Filter'
import Header from '../components/Header'
import classes from '../styles/MainPage.module.css'

const MainPage = () => {
    return (
        <div className={classes.mainPage}>
            <Header></Header>
            <div className={classes.siteContainer}>
                <Filter></Filter>
                <Books></Books>
            </div>
        </div>
    )
}

export default MainPage