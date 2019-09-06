import React, { Component } from 'react';
import Inputfield from './input-field';
import Button from './button';
import '../../css/form.css';
;
class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            message: '',
            isLoggedin: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(value, name){
        this.setState({
            [name]: value
        })
    }
    
    handleClick(e){
        e.preventDefault();

        let data = JSON.stringify({
            "username": this.state.username,
            "password": this.state.password
        });

        if (this.state.username && this.state.password) {
            fetch(`api/login`, {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        isLoggedin: true
                    });
                    this.props.setLoginStatus(true, this.state.username);
                }
            })
            .catch(console.error)
        } else {
            this.setState({
                message: 'All fileds required'
            })
        }
    }
    render(){

        return(
            <div id="loginForm" className="position-form login-form">
				<div className="form-wrapper form-wrapper-login-form">
                    { this.state.message && 
                        <div id="error-msg-wrapper" className="error-msg"><strong>Error: </strong><span id="error-msg">{this.state.message}</span></div> }
					<form className="form form-login" id="login-form" action="">
                        <Inputfield 
                            className = "input input-username"
                            label = "username"
                            id = "username"
                            type = "text"
                            name = "username"
                            placeholder = "enter username"
                            handleInputChange = {this.handleChange}
                            isValid = {this.validate}
                            value = {this.state.username}
                            autoComplete = "username"
                        />
                        <Inputfield 
                            className = "input input-password"
                            label = "password"
                            id = "password"
                            type = "password"
                            name = "password"
                            handleInputChange = {this.handleChange}
                            isValid = {this.validate}
                            value = {this.state.password}
                            autoComplete = "current-password"
                        />
                        <Button 
                            className = "button button-register"
                            title = "login"
                            onClick = {this.handleClick}
                        />
					</form>
				</div>
			</div>
        );
    }
}


export default LoginForm;