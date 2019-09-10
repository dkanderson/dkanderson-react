import React, { Component } from 'react';
import Button from './button';
import InputField from './input-field';
import Textarea from './textarea';
import TimeStamp from '../../helpers/timeStamp';
import Message from './message';

class Addblog extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            title: '',
            slug: '',
            content: '',
            date: '',
            validation: { 
                hasError: false,
                title: { hasError: false },
                content: { hasError: false }
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getNextId = this.getNextId.bind(this);
    }

    componentWillMount(){
        this.getNextId();
    }

    getNextId(){
        fetch('/api/blog')
            .then(response => response.json())
            .then((response) => {
                this.setState({
                    id: response[0].id + 1
                })
            })
    }

    submitForm(data){
        fetch('/api/blog', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json"
            }
        })
        .then(response => {
            if(response.status === 200) {
                this.setState({
                    validation: {
                        hasSuccess: true
                    }
                })
            }
        })
    }

    handleChange(value, name){
        let currentDate = TimeStamp();

        this.setState({
            [name] : value,
            date: currentDate
        })
    }

    handleSubmit(){

        let postData = this.state;
        delete postData.validation;

        let validation = this.validate(postData);
        
        if(!validation.hasError){
            postData.slug = postData.title.replace(/ /g,"-").toLowerCase();
            this.submitForm(postData);
            this.setState({
                validation
            })
        } else {
            this.setState({
                validation
            })
        }
        

        this.setState({
            title: '',
            email: '',
            url: '',
            content: '',
            date: ''
        })

        this.getNextId();
        
    }

    validate(formData){
        let result = { 
                        hasError: false,
                        title: {},
                        content: {},
                        messages: []
                    };

        if(!formData.title){
            result.title.hasError = true;
            result.messages.push("Title is a required Field");
            result.hasError = true;
        } else {
            result.title.hasError = false;
        }

        if(!formData.content){
            result.content.hasError = true;
            result.messages.push("Content is a required Field");
            result.hasError = true;
        } else {
            result.content.hasError = false;
        }

       return result; 
    }

    render(){

        return(
            <div className="add-blog-form-wrapper form-wrapper">
                { this.state.validation.hasError && 
                    <Message message="Looks like you missed a few things" messageType="error-msg" messageObject={this.state.validation} />
                }
                { this.state.validation.hasSuccess && 
                    <Message message={`Added successfully`} messageType="success"  />
                }

                <form className="add-blog-form" action="">
                    <InputField 
                        label = "title"
                        className = "blog-title text-input"
                        id="blog-title-input" 
                        type="text"
                        name="title"
                        placeholder=""
                        handleInputChange={this.handleChange}
                        validate = {this.validate}
                        value = {this.state.title}
                    />
                    <Textarea 
                        id = "blog-content"
                        className = "blog-content text-area"
                        name="content"
                        value={this.state.content} 
                        rows = "20"
                        aria-required="true"
                        handleChange={this.handleChange}
                        label="Content"
                    />
                </form>
                <Button 
                    id = "add-blog-btn"
                    className = "add-blog-btn btn form-btn"
                    onClick = {this.handleSubmit}
                    title = "Add New Blog Post"
                />
               
            </div>
        )
    }

}

export default Addblog;