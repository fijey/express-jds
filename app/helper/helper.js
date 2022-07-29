module.exports = {

    response(status_code,status_message,data){
        return {
            status_code: status_code,
            status_message : status_message,
            result:data,
        }

    },
    generatePassword(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for (var i = 0; i <= 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
}
