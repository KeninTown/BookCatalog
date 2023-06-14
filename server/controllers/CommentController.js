import CommentService from "../services/CommentService.js";

class CommentController{
    async create(req, res, next){
        try {
            const bookId = req.params.id;
            const {username, title, text, rating} = req.body;
            await CommentService.create(username, bookId, title, text, rating);
            return res.status(201).end();
        } catch (error) {
            next(error)
        }   
    }
}

export default new CommentController();