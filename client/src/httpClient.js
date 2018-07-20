import axios from 'axios';
import jwtDecode from "jwt-decode";


const httpClient = axios.create()

httpClient.getToken = () => {
    return localStorage.getItem('token')
}

httpClient.setToken = (token) => {
    localStorage.setItem('token', token)
    return token
}

httpClient.getCurrentUser = function(){
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
}

httpClient.signUp = function(userInfo){
    return this({method: "post", url :'/api/users', data: userInfo})
        .then((serverResponse) => {
            if(serverResponse.data.message === "SUCCESS"){
                const token = serverResponse.data.payload
                this.defaults.headers.common.token = this.setToken(token)
                return jwtDecode(token)
            } else{
                return false
            }
        })
}

httpClient.logIn = function(credentials){
    return this({method: "post", url :'/api/users/authenticate', data: credentials})
        .then((serverResponse) => {
            if(serverResponse.data.message === "SUCCESS"){
                const token = serverResponse.data.payload
                this.defaults.headers.common.token = this.setToken(token)
                return jwtDecode(token)
            } else{
                return false
            }
        })
}

httpClient.logOut = function(){
    localStorage.clear();
    delete httpClient.defaults.headers.common.token;
    return true
}

httpClient.defaults.headers.common.token = httpClient.getToken()

export default httpClient