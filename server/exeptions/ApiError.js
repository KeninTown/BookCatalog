export default class ApiError extends Error{
    message;
    status;

    constructor(status, message, errors = []){
        super(message);
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    static BadRequest(message, errors){
        return new ApiError(400, message, errors)
    }

    static Unauthorized(){
        return new ApiError(401, 'Unauthorized');
    }

    static Forbidden(message){
        return new ApiError(403, message);
    }
}