import CommentService from "../services/CommentService.js";

class CommentController{
    async getByBookId(req, res, next){
        try {
            const bookId = req.params.id;
            const comments = await CommentService.getByBookId(bookId);
            return res.status(200).json(comments);
        } catch (error) {
            next(error)
        }
    }

    async getByUserId(req, res, next){
        try {
            const userId = req.params.id;
            const comments = await CommentService.getByUserId(userId);
            return res.status(200).json(comments);
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next){
        try {
            const bookId = req.params.id;
            const {title, text, rating} = req.body;
            const id = req.user.id;
            await CommentService.create(id, bookId, title, text, rating);
            res.status(201).end();
        } catch (error) {
            next(error)
        }   
    }

    async update(req, res, next){
        try {
            const {_id, likes, dislikes} = req.body;
            await CommentService.update(_id, likes, dislikes);
            return res.status(201).end();
        } catch (error) {
            next(error)
        }   
    }
}

export default new CommentController();