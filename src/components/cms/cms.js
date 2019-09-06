import React, { Component } from 'react';
import CMSnav from './nav';
import '../../css/cms.css';
import LogginForm from './login';

class CMS extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false
        }
        this.setLoginStatus = this.setLoginStatus.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentWillMount(){

        console.log('CMS: Component Mounted');
        
        if(!this.state.isLoggedIn){
            fetch('api/authenticate')
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.message === "authenticated" ) {
                        this.setState({
                            isLoggedIn: true,
                            user: res.username
                        })
                    } else {
                    this.setState({
                        isLoggedIn: false
                    })
                    }
                })
                .catch(console.error)
        }
    }

    setLoginStatus(status, user){
        this.setState({
            isLoggedIn: status,
            user
        })
    }

    logout(){
        fetch('api/logout', {
            method: 'POST', 
        })
        .then(console.log)
        .then(() => {
            this.setState({
                isLoggedIn: false
            })
            window.location.href = '/';
        })
    }

    render(){
        return(
            <div>
            { this.state.isLoggedIn &&
                <div>
                    <div className="intro cms">
                        <div className="container">
                            <h1 className="move-up">Content Manager</h1>
                            <div className="userLogin">
                                <div id="user-login" className="user-login">
                                    { this.state.isLoggedIn &&
                                        <div>
                                            <span className="link nav-link sign-in">logged as in: {this.state.user} |</span>
                                            <span className="link nav-link register logout" onClick = {this.logout}> logout</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <CMSnav isLoggedIn={this.state.isLoggedIn} />
                </div>
            }

            { !this.state.isLoggedIn && 

                <LogginForm setLoginStatus={this.setLoginStatus} />

            }
            </div>
            
        );
    }
    
}

export default CMS;
