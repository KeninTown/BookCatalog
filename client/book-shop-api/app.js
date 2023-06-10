import Express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import fetch from "node-fetch";
dotenv.config();

const app = Express();

app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/src/App.tsx');
});

app.get('/api/books', async (req, res) => {
    try {
        const amount = req.query.amount;

        let rawData = await fetch(`https://www.googleapis.com/books/v1/volumes?q=*&printType=books&maxResults=${amount}`);
        let googleApiBooks = await rawData.json();
        let books = [];
        googleApiBooks.items.forEach(element => {
            const imgLinks = element.volumeInfo.imageLinks;
            // let imgUrl = '';
            // if(imgLinks)
            //     imgUrl = imgLinks.thumbnail;
            
            books.push({
                id: element.id,
                authors: element.volumeInfo.authors,
                title: element.volumeInfo.title,
                img: imgLinks ? imgLinks : {},
                genre: element.volumeInfo.categories
            });
        });
        res.json(books);   
    } catch (error) {
        console.log(error);
    }
});

app.get('/api/books/:id', async (req, res) => {
    try {
        let rawData = await fetch(`https://www.googleapis.com/books/v1/volumes/${req.params.id}`);
        let bookInfo = await rawData.json();
        
        const imgLinks = bookInfo.volumeInfo.imageLinks ? bookInfo.volumeInfo.imageLinks : {};

        res.json({
            id: bookInfo.id,
            authors: bookInfo.volumeInfo.authors,
            title: bookInfo.volumeInfo.title,
            img: imgLinks,
            genre: bookInfo.volumeInfo.categories
        });    
    } catch (error) {
        console.log(error);
    }
});

app.post('/api/newbook', (req, res) => {
    
})

const listener = app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})