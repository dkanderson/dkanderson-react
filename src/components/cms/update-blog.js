import React, { Component } from 'react';
import Button from './button';
import InputField from './input-field';
import Textarea from './textarea';
import Message from './message';

class UpdateBlog extends Component{
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
    }

    componentWillMount(){
        fetch(`/api/blog/${this.props.slug}`)
            .then(response => response.json())
            .then((response) => {
                this.setState({
                    id: response.id,
                    title: response.title,
                    slug: response.slug,
                    content: response.content,
                    date: response.date
                })
            })
            .catch(error => {
                console.error(error);
            })
    }

    handleChange(value, name){
        this.setState({
            [name] : value
        })
    }

    handleSubmit(){

        let postData = this.state;
        delete postData.validation;

        let validation = this.validate(postData);
        
        if(!validation.hasError){

            this.submitForm(postData);
            this.setState({
                validation
            })
        } else {
            this.setState({
                validation
            })
        }
        
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


    submitForm(data){
        fetch(`/api/blog/${data.slug}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(response.status === 200) {
                this.setState({
                    validation: {
                        hasSuccess: true,
                        hasError: false
                    }
                })
            }
        })
        .catch(console.error)
            
    }

    render(){
        return(
            <div className="add-blog-form-wrapper form-wrapper">

            { this.state.validation.hasError && 
                <Message message="Looks like you missed a few things" messageType="error-msg" messageObject={this.state.validation} />
            }

            { this.state.validation.hasSuccess && 
                <Message message={`${this.state.title} updated successfully`} messageType="success"  />
            }
               
                <form className="add-blog-form">
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
                    />
                </form>
                <Button 
                        id = "edit-blog-btn"
                        className = "edit-blog-btn btn form-btn"
                        onClick = {this.handleSubmit}
                        title = "Update Blog Post"
                    />
            </div>
        )
    }
}

export default UpdateBlog;