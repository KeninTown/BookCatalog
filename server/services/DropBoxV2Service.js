import dropboxV2Api from 'dropbox-v2-api';
import open from 'open';

class DropBoxV2Service{
    constructor(){
        //Код правильный!
        //Создание объекта dropbox с данными для подключения
        this.dropbox = dropboxV2Api.authenticate({
            client_id: process.env.DROPBOX_CLIENT_ID,
            client_secret: process.env.DROPBOX_CLIENT_SECRET,
            token_access_type: process.env.DROPBOX_TOKEN_ACCESS_TYPE,
            redirect_uri: process.env.DROPBOX_REDIRECT_URI
        })

        open(this.dropbox.generateAuthUrl())
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

    async refreshAccessToken(code){
        this.dropbox.getToken(code, (err, response) => {
            console.log(err);
            console.log('user\'s access_token: ', response.access_token);
            console.log('user\'s refresh_token: ', response.refresh_token);
            setInterval(() => {
                this.dropbox.refreshToken(response.refresh_token, (err, result) => {
                    console.log(err);
                    console.log(result);
                })
            }, 12600000)
        });
    }
}

export default new DropBoxV2Service();