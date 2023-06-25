import dropboxV2Api from 'dropbox-v2-api';
import dotenv from 'dotenv'
dotenv.config()

class DropBoxV2Service{
    constructor(){
        //Создание объекта dropbox с данными для подключения
        this.dropbox = dropboxV2Api.authenticate({
            client_id: process.env.DROPBOX_CLIENT_ID,
            client_secret: process.env.DROPBOX_CLIENT_SECRET,
            token_access_type: process.env.DROPBOX_TOKEN_ACCESS_TYPE,
            redirect_uri: process.env.DROPBOX_REDIRECT_URI
        })

        // получение access token для доступа к Dropbox
        this.getAccessToken();
        
        //обновление access token каждые 3,5 часа
        setInterval(() => {
            this.getAccessToken()
        }, 12600000)
    }

    //получение файла из Dropbox
    async getLogo(fileName){
        // await this.dbx.checkAndRefreshAccessToken();
        return this.dropbox({
            resource: 'files/download',
            parameters: {path: `/usersLogo/${fileName}`}
        })
    }

    //удаление логотипа
    async deleteLogo(fileName){
        this.dropbox({
            resource: 'files/delete_v2',
            parameters: {path:`/usersLogo/${fileName}`}
        })
    }

    //Загрузка файла в Dropbox
    async uploadLogo(fileName, file){
        this.dropbox({
            resource: 'files/upload',
            parameters: {
                path: `/usersLogo/${fileName}`
            },
            readStream: file
        })
    }

    async getAccessToken(){ 
        this.dropbox.refreshToken(process.env.DROPBOX_REFRESH_TOKEN, (err, result) => {
            console.log(err);
            console.log(result);
        })
    }
}

export default new DropBoxV2Service();