import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import TokenService from './TokenService.js';
import UserModel from '../models/UserModel.js';
import ApiError from '../exeptions/ApiError.js'
import UserDto from '../dtos/UserDto.js';
import TokenModel from '../models/TokenModel.js';
import MailService from './mailService.js';
import randToken from 'rand-token'
import ResetTokenModel from '../models/ResetTokenModel.js';
import RoleModel from '../models/RoleModel.js';

class AuthService{

    //регистрация пользователя
    async registration(email, username, password){
        const isExistEmail = await UserModel.findOne({email});
        const isExistUsermame = await UserModel.findOne({username});

        if(isExistEmail)
            throw ApiError.BadRequest('Email is taken');
        
        if(isExistUsermame)
            throw ApiError.BadRequest('Username is taken');

        const hashedPassword = await bcrypt.hash(password, 7);
        const activationLink = uuidv4();

        const role = await RoleModel.findOne({value: 'User'});
        const user = await UserModel.create({email, username, password:hashedPassword, activationLink, roles: [role.value]});

        await MailService.sendActivateMail(user.email, `${process.env.API_URL}/api/auth/activate/${activationLink}`);
        
        const userDto = new UserDto(user);
        const tokens = TokenService.generateToken({...userDto});

        await TokenService.saveRefreshToken(userDto.id, tokens.refreshToken);
        
        return {...tokens, user: userDto};
    }

    //вход пользователя в аккаунт
    async login(email, password){
        const user = await UserModel.findOne({email});

        if(!user)
            throw ApiError.BadRequest('Invalid email');
        
        const isPasswordMacth = await bcrypt.compare(password, user.password);

        if(!isPasswordMacth)
            throw ApiError.BadRequest('Invalid password');

        const userDto = new UserDto(user);
        const tokens = TokenService.generateToken({...userDto});
        await TokenService.saveRefreshToken(user._id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    //выход из аккаунта
    async logout(refreshToken){
        const data = await TokenService.removeToken(refreshToken);
        return data;
    }

    //обновление refreshTokenа
    async refresh(refreshToken){
       
        if(!refreshToken)
            throw ApiError.Unauthorized();

        const tokenData = TokenService.validateRefreshToken(refreshToken);
        const tokenDB = TokenModel.findOne({refreshToken});

        if(!tokenData || !tokenDB)
            throw ApiError.Unauthorized();

        const user = await UserModel.findById(tokenData.id);

        const userDto = new UserDto(user);
        const tokens = TokenService.generateToken({...userDto});

        await TokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

        return {...tokens, user:userDto}    
    }

    //активация аккаунта через письмо на почту
    async activate(link){
        const user = await UserModel.findOne({activationLink: link});
        if(!user)
            throw ApiError.BadRequest('Wrong activation link');
        user.isActivated = true;
        await user.save();
    }

    async sendResetEmail(email){
        const user = await UserModel.findOne({email});
        if(!user)
            throw ApiError.BadRequest('Invalid email');
        
        const resetToken = randToken.generate(6, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        await ResetTokenModel.create({user: user._id, resetToken});
        console.log(resetToken);
        //сгенерировать код, записать в юзера и сохранить
        await MailService.sendResetPasswordMail(email, resetToken);
    }

    async compareResetToken(email, token){
        const user = await UserModel.findOne({email});
        if(!user)
            throw ApiError.BadRequest('Invalid email');
        
        const resetToken = ResetTokenModel.findOne({user: user._id, resetToken: token});
        if(!resetToken)
            throw ApiError.BadRequest('Invalid reset token');

        const currentTime = Date.now();
        //срок жизни токена 24 часа, проверяем действителен ли токен
        if(currentTime - resetToken.creationTime > 86400000)
            throw ApiError.BadRequest('Reset token expired')
        
        await ResetTokenModel.deleteOne({user: user._id, resetToken: token});
    }
}

export default new AuthService();