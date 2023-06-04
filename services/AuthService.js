import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import TokenService from './TokenService.js';
import UserModel from '../models/UserModel.js';
import ApiError from '../exeptions/ApiError.js'
import UserDto from '../dtos/UserDto.js';
import TokenModel from '../models/TokenModel.js';
import MailService from './mailService.js';


class AuthService{
    async registration(email, username, password){
        try {
            const isExist = await UserModel.findOne({email});
            if(isExist)
                throw ApiError.BadRequest('User with this email is already exist');
            
            const hashedPassword = await bcrypt.hash(password, 7);
            const activationLink = uuidv4();

            const user = await UserModel.create({email, username, password:hashedPassword, activationLink});

            await MailService.sendActivateMail(user.email, `${process.env.API_URL}/auth/activate/${activationLink}`);
            
            const userDto = new UserDto(user);
            const tokens = TokenService.generateToken({...userDto});

            await TokenService.saveRefreshToken(userDto.id, tokens.refreshToken);
           
            return {...tokens, user: userDto};
        } catch (error) {
            console.log(error);
        }
    }

    async login(email, password){
        try {
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
        } catch (error) {
            console.log(error);
        }
    }

    async logout(refreshToken){
        try {
            const data = await TokenService.removeToken(refreshToken);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async refresh(refreshToken){
        try {
            if(!refreshToken)
                throw ApiError.Unauthorized();

            const tokenData = TokenService.validateRefreshToken(refreshToken);
            const tokenDB = TokenModel.findOne({refreshToken});

            if(!tokenData || !tokenDB)
                throw ApiError.Unauthorized();

            const user = await UserModel.findById(tokenData.id);

            const userDto = new UserDto(user);
            const tokens = TokenService.generateToken(...userDto);

            await TokenService.saveRefreshToken(tokens.refreshToken);

            return {...tokens, user:userDto}    
        } catch (error) {
            console.log(error);
        }
    }

    async activate(link){
        try {
            const user = await UserModel.findOne({activationLink: link});
            if(!user)
                throw ApiError.BadRequest('Wrong activation link');
            user.isActivated = true;
            await user.save();
        } catch (error) {
            
        }
    }
}

export default new AuthService();