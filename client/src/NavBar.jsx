import React, {Fragment} from "react"
import {Link} from "react-router-dom"

const NavBar = (props) => {
    return(
        <div className="NavBar">
            <Link to='/'> Home </Link>
            {props.currentUser 
            ?  (
                <Fragment>
                    <Link to ='/vip'> VIP </Link>
                    <Link to ='/logout'> Log Out </Link>
                </Fragment>
            )
            : (
                <Fragment>
                    <Link to ='/login'> Log In </Link>
                    <Link to ='/signup'> Sign Up </Link>
                </Fragment>
            )
            }
        </div>
    )
}

export default NavBar