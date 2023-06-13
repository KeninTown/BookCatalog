import CommentService from "../services/CommentService.js";

class CommentController{
    async create(req, res, next){
        try {
            const {username, bookId, title, text, rating} = req.body;
            await CommentService.create(username, bookId, title, text, rating)
            return res.status(201).end();
        } catch (error) {
            next(error)
        }   
    }
}

export default new CommentController();