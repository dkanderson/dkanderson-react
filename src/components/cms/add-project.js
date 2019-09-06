import React, { Component } from 'react';
import InputField from './input-field';
import DisplayImage from '../displayImage';
import UploadFile from './upload-file';
import Button from './button';
import Message from './message';
import $ from 'jquery';
import CheckBoxGroup from './checkbox-group';
import Textarea from './textarea';

let chekedValues = [];

class AddProject extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            content: '',
            project_url: '',
            client_banner_class: '',
            tech: [],
            project_bg: '',
            screenshot_a: '',
            banner: '',
            validation: {
                hasError: false,
                hasSuccess: false
            }
        }
        this.setFileUrl = this.setFileUrl.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.generateNextId = this.generateNextId.bind(this);
    }

    componentWillMount(){
        this.generateNextId();
    }

    generateNextId(){
        fetch('/api/work')
            .then(response => response.json())
            .then(response => {
                this.setState({
                    id: response[response.length -1].id + 1
                })
            })
            .catch(console.error)
    }

    setFileUrl(path, isUploaded, key){
        if(isUploaded){
            this.setState({
                [key]: path
            })
        }
    }

    handleSubmit(){
        $('body, html').animate({scrollTop: 0}, "slow");
        let postData = this.state;
        delete postData.validation;
        this.submitForm(postData);

        this.generateNextId();

        this.setState({
            title: '',
            content: '',
            project_url: '',
            client_banner_class: '',
            tech: [],
            project_bg: '',
            screenshot_a: '',
            banner: '',
            validation: {
                hasError: false,
                hasSuccess: false
            }
        });
    }

    handleChange(value, name){
        this.setState({
            [name] : value
        })
    }

    handleCheckboxChange(checked, value){

        if(this.state.tech){
            chekedValues = this.state.tech;
        }

        if(checked){
            chekedValues = chekedValues.filter(item => item !== value);
            chekedValues.push(value);
        } else {
            chekedValues = chekedValues.filter(item => item !== value);
        }

        this.setState({
            tech: chekedValues
        })
    }

    submitForm(data){
        fetch('/api/work', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            if(response.status === 200){
                this.setState({
                    validation: {
                        hasError: false,
                        hasSuccess: true,
                        message: `${data.title} ${response.message}`,
                        type: 'success'
                    }
                })
            } else {
                this.setState({
                    validation: {
                        hasError: true,
                        message: response.message,
                        type: response.title
                    }
                });
                
            }
        })
    }

    render(){
        return(
            <div id="add-new-projects" className="add-new-project-wrapper form-wrapper">
                { (this.state.validation.hasError || this.state.validation.hasSuccess) && 
                    <Message message={this.state.validation.message} messageType={this.state.validation.type} />
                }
                <form className="add-new-project-form" action="">

                    <InputField 
                        label = "title"
                        className = "title text-input"
                        id="title-input" 
                        type="text"
                        name="title"
                        placeholder=""
                        handleInputChange={this.handleChange}
                        validate = {this.validate}
                        value = {this.state.title}
                    />

                    <Textarea
                        label = "content"
                        className = "content text-input"
                        id="content-input" 
                        rows = "4"
                        name="content"
                        handleChange={this.handleChange}
                        value = {this.state.content}
                    />

                    <InputField 
                        label = "url"
                        className = "project_url text-input"
                        id="project-url-input" 
                        type="text"
                        name="project_url"
                        placeholder=""
                        handleInputChange={this.handleChange}
                        validate = {this.validate}
                        value = {this.state.project_url}
                    />

                    <InputField 
                        label = "client banner class"
                        className = "client-banner-class text-input"
                        id="client-banner-class-input" 
                        type="text"
                        name="client_banner_class"
                        placeholder=""
                        handleInputChange={this.handleChange}
                        validate = {this.validate}
                        value = {this.state.client_banner_class}
                    />

                    <CheckBoxGroup 
                        label = "tech"
                        className = "tech text-input"
                        id="tech-checkbox-group" 
                        tech="text"
                        name="tech"
                        handleInputChange={this.handleCheckboxChange}
                        validate = {this.validate}
                        value = {this.state.tech}
                    />

                    <InputField 
                        className = "project-bg text-input"
                        id="project-bg-input" 
                        type="hidden"
                        name="project_bg"
                        value = {this.state.project_bg}
                    />

                    <InputField 
                        className = "screenshot-a text-input"
                        id="screenshot-a-input" 
                        type="hidden"
                        name="screenshot_a"
                        value = {this.state.screenshot_a}
                    />

                    <InputField 
                        className = "banner text-input"
                        id="banner-input" 
                        type="hidden"
                        name="banner"
                        value = {this.state.banner}
                    />

                </form>

                <UploadFile 
                    setUrl={this.setFileUrl}
                    showMessage={this.toggleMessage}
                    label="project background"
                    name="project_bg"
                />

                { this.state.project_bg &&
                    <DisplayImage 
                        url={this.state.project_bg}
                        title="project background"
                    />
                }

                <UploadFile 
                    setUrl={this.setFileUrl}
                    showMessage={this.toggleMessage}
                    label="Screenshot"
                    name="screenshot_a"
                />

                { this.state.screenshot_a &&
                    <DisplayImage 
                        url={this.state.screenshot_a}
                        title="Screenshot"
                    />
                }

                <UploadFile 
                    setUrl={this.setFileUrl}
                    showMessage={this.toggleMessage}
                    label="Banner"
                    name="banner"
                />

                { this.state.banner &&
                    <DisplayImage 
                        url={this.state.banner}
                        title="Banner"
                    />
                }

                <Button 
                        id = "add-project-btn"
                        className = "add-project-btn btn form-btn"
                        onClick = {this.handleSubmit}
                        title = "Add New Project"
                    />

            </div>
        )
    }
}

export default AddProject;