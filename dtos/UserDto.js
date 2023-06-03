export default class UserDto{
    email;
    username;
    isActivated;
    id;
    
    constructor(user){
        this.email = user.email;
        this.username = user.username;
        this.isActivated = user.isActivated;
        this.id = user._id;
    }
}