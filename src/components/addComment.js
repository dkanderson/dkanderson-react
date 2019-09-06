import React, { Component } from 'react';
import TimeStamp from '../helpers/timeStamp';
import Message from './formMessage';

class AddComment extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            email: '',
            url: '',
            content: '',
            date: '',
            validation: { 
                    hasError: false,
                    username: { hasError: false },
                    email: { hasError: false },
                    content: { hasError: false }
                }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentWillMount(){
        fetch('/api/comment')
            .then(response => response.json())
            .then((response) => {
                this.setState({
                    lastId: response[response.length - 1].id
                })
            })
    }

    handleChange(e){
        let name = e.currentTarget.name,
            value = e.currentTarget.value,
            currentDate = TimeStamp();
        this.setState({
            [name]: value,
            date: currentDate
        })
    }

    submitForm(data){

        let method = 'POST';
        let apiUrl = '/api/comment';
        fetch(apiUrl, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if ( response.status === 200 ) {
                this.props.onCommentAdd(data.blog_id);
            }
        })

    }

    handleSubmit(){
        
        let postData = this.state;
        delete postData.validation;

        let validation = this.validateForm(postData);

        postData.id = this.state.lastId + 1;
        postData.blog_slug = this.props.blog_slug;
        postData.blog_id = this.props.blog_id;

        delete postData.lastId;

        
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
        

        this.setState({
            username: '',
            email: '',
            url: '',
            content: '',
            date: ''
        })
    }

    validateForm(formData){
        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            result = { 
                        hasError: false,
                        username: {},
                        email: {},
                        content: {} 
                    };

        if(!formData.username){
            result.username.hasError = true;
            result.username.message = "Name is a required Field";
            result.hasError = true;
        } else {
            result.username.hasError = false;
        }

        if(!formData.email){
            result.email.hasError = true;
            result.email.message = "Email is a required Field";
            result.hasError = true;
        } else if( !formData.email.match(regex) ) {
            result.email.hasError = true;
            result.email.message = "Email format is incorrect";
            result.hasError = true;
        } else {
            result.email.hasError = false;
        }

        if(!formData.content){
            result.content.hasError = true;
            result.content.message = "Comment is a required Field";
            result.hasError = true;
        } else {
            result.content.hasError = false;
        }

       return result; 

    }

    render(){
        return (
            <section id="respond" className="comment-response">
  
                <h3>Leave a Reply</h3>
                <p className="cancel-comment-reply"></p>

                { this.state.validation.hasError && 
                    <Message message="Looks like you missed a few things" messageType="error-msg" messageObject={this.state.validation} />
                }
                
                
                <form  id="commentform">

                    <div className="form-group">
                        <label htmlFor="username">Name</label>
                        <input type="text" className={`form-control input-text${this.state.validation.username.hasError ? ' has-error' : ''}`} name="username" id="username" value={this.state.username} size="22" aria-required="true" onChange={this.handleChange} />
                        <span className="required">*</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="will not be published" className={`form-control input-text${this.state.validation.email.hasError ? ' has-error' : ''}`} name="email" id="email" value={this.state.email} size="22" aria-required="true" onChange={this.handleChange} />
                        <span className="required">* </span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="url">Website</label>
                        <input type="url" className="form-control input-text" name="url" id="url" value={this.state.url} size="22" onChange={this.handleChange} />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="content">Comment</label>
                    <textarea name="content" id="content" className={`form-control${this.state.validation.email.hasError ? ' has-error' : ''}`} value={this.state.content} rows="5" aria-required="true" onChange={this.handleChange}></textarea>
                    </div>
                </form>
                <p><button className="btn btn-primary" onClick={this.handleSubmit}>Submit Comment</button></p>
                
            </section>
        )
    }
}

export default AddComment;