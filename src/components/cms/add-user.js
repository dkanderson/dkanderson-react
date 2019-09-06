import React, { Component } from 'react';
import Inputfield from './input-field';
import Button from './button';
import validator from './validator';
import Message from './message';

class AddUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConf: '',
            validation: {
                username: {
                    status: 'pristine',
                    valid: false,
                    exists: false 
                },
                email: {
                    status: 'pristine',
                    valid: false
                },
                password: {
                    status: 'pristine',
                    valid: false
                },
                passwordConf: {
                    status: 'pristine',
                    valid: false
                },
                messages: [],
                addUserSuccess: false
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    handleChange(value, name, e){
        this.setState({
            [name]: value
        })
    }
    validate(){
        const vData = validator(this.state);
        this.setState({
            validation: vData
        });
    }

    handleClick(){
        console.log('click!');
        this.validate();
        let vData = Object.assign({}, this.state.validation);
        delete vData.messages;
        delete vData.addUserSuccess;
        const isValid = preSubmitValidation(vData);
        let data = Object.assign({}, this.state);

        delete data.validation;

        if(isValid){
            fetch('api/users', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if(response.status === 200){
                    this.setState({
                        username: '',
                        email: '',
                        password: '',
                        passwordConf: '',
                        validation: {
                            username: {
                                status: 'pristine',
                                valid: false,
                                exists: false 
                            },
                            email: {
                                status: 'pristine',
                                valid: false
                            },
                            password: {
                                status: 'pristine',
                                valid: false
                            },
                            passwordConf: {
                                status: 'pristine',
                                valid: false
                            },
                            messages: [],
                            addUserSuccess: true
                        }
                    })
                }
            })
        } else {
            console.log(isValid);
        }
    }

    handleFocus(){
        let vData = Object.assign({}, this.state.validation);

        vData.addUserSuccess = false;
        this.setState({
            validation: vData
        })
    }

    render(){
        return(
            <div className="position-form">
				<div className="form-wrapper form-wrapper-register-form">
                    <form className="form form-register" id="registration-form" action="">
                        { (this.state.validation.messages.length > 0) &&
                            <Message message="Looks like you missed a few things" messageType="error-msg" messageObject={this.state.validation} />
                        }
                        { this.state.validation.addUserSuccess && 
                            <Message message={`${this.state.username} Added successfully`} messageType="success"  />
                        }
                        <Inputfield 
                            className = {`input input-username`}
                            label = "username"
                            id = "username"
                            type = "text"
                            name = "username"
                            placeholder = "enter username"
                            handleInputChange = {this.handleChange}
                            validate = {this.validate}
                            handleFocus = {this.handleFocus}
                            isValid = {this.state.validation.username.valid}
                            status = {this.state.validation.username.status}
                            value = {this.state.username}
                            autoComplete = "username"
                            exists = {this.state.validation.username.exists}
                        />
                        <Inputfield 
                            className = "input input-email"
                            label = "email"
                            id = "email"
                            type = "email"
                            name = "email"
                            placeholder = "enter email address"
                            handleInputChange = {this.handleChange}
                            handleFocus = {this.handleFocus}
                            validate = {this.validate}
                            isValid = {this.state.validation.email.valid}
                            status = {this.state.validation.email.status}
                            value = {this.state.email}
                            autoComplete = "email address"
                        />
                        <Inputfield 
                            className = "input input-password"
                            label = "password"
                            id = "password"
                            type = "password"
                            name = "password"
                            handleInputChange = {this.handleChange}
                            handleFocus = {this.handleFocus}
                            validate = {this.validate}
                            isValid = {this.state.validation.password.valid}
                            status = {this.state.validation.password.status}
                            value = {this.state.password}
                            autoComplete = "new-password"
                        />
                        <Inputfield 
                            className = "input input-password"
                            label = "Confirm password"
                            id = "password-confirm"
                            type = "password"
                            name = "passwordConf"
                            handleInputChange = {this.handleChange}
                            handleFocus = {this.handleFocus}
                            validate = {this.validate}
                            isValid = {this.state.validation.passwordConf.valid}
                            status = {this.state.validation.passwordConf.status}
                            value = {this.state.passwordConf}
                            autoComplete = "new-password"
                        />
                    </form>
                    <Button 
                        className = "button button-register"
                        title = "Add User"
                        onClick = {this.handleClick}
                    />

                </div>
			</div>
        );
    }
}

function preSubmitValidation(valid) {

    for(let i in valid) {
        if ( !valid[i].valid ) {
            return false;
        } 
    }
    return true;
}

export default AddUser;