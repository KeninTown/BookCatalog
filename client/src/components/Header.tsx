import classes from './../styles/Header.module.css'
import logotype from './../assets/logotype.svg'
// import searchButton from './../assets/searchButton.svg'

const Header = () => {
    return (
        <div className={classes.siteHeaderContainer}>
            <header className={classes.siteHeader}>
                <div className={classes.aboutCompany}>
                    <div className={classes.logoCompanyContainer}>
                        <img className={classes.logoCompanyImage} src={logotype}></img>
                    </div>
                    <div className={classes.nameCompany}>
                        mooduck
                    </div>
                </div>
                <nav className={classes.navContainer}>
                    <ul className={classes.nav}>
                        <li className={classes.item}>Акции</li>
                        <li className={classes.item}>Новинки</li>
                        <li className={classes.item}>Бестселлеры</li>
                        <li className={classes.item}>Подборки</li>
                    </ul>
                </nav>
                <div className={classes.searchContainer}>
                    <input className={classes.search} placeholder='Название книги'></input>
                    {/* <img className={classes.searchButton} src={searchButton}></img> */}
                </div>
            </header>
            <hr></hr>
        </div>
    )
}

export default Header