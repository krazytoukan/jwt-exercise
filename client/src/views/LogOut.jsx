import React from 'react'
import {Redirect} from 'react-router-dom'
import httpClient from "../httpClient.js"

class LogOut extends React.Component{
    
    componentDidMount(){
        console.log("Logging Out")
        httpClient.logOut()
        this.props.onLogOutSuccess()
    }
    
    render(){
        return <Redirect to='/login' />
    }
}

export default LogOut