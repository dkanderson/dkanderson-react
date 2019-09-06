import React, { Component } from 'react';
import InputField from './input-field';
import DisplayImage from '../displayImage';
import UploadFile from './upload-file';
import Button from './button';
import Message from './message';
import $ from 'jquery';

class AddArtwork extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            status: '',
            medium: '',
            subject: '',
            type: '',
            size: '',
            orientation: '',
            infobox_id: '',
            original_img: '',
            painting_sm: '',
            painting_lg: '',
            price: 400000000,
            validation: {
                hasError: false,
                hasSuccess: false
            }
        }
        this.setFileUrl = this.setFileUrl.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleMessage = this.toggleMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentWillMount(){
        fetch('/api/artwork')
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

        this.setState({
            title: '',
            status: '',
            medium: '',
            subject: '',
            type: '',
            size: '',
            orientation: '',
            infobox_id: '',
            original_img: '',
            painting_sm: '',
            painting_lg: '',
            price: 400000000,
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

    submitForm(data){
        fetch('/api/artwork', {
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

    showSuccessMessage(title, message){
        console.log(`${title} Uploaded, no worries!`);
    }

    toggleMessage(message, type){
        console.log(message);
    }

    render(){
        return(
            <div id="add-new-artworks" className="add-new-artwork-wrapper form-wrapper">
                { (this.state.validation.hasError || this.state.validation.hasSuccess) && 
                    <Message message={this.state.validation.message} messageType={this.state.validation.type} />
                }
                <form className="add-new-artwork-form" action="">

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

                    <InputField 
                        label = "status"
                        className = "status text-input"
                        id="status-input" 
                        type="text"
                        name="status"
                        placeholder=""
                        handleInputChange={this.handleChange}
                        validate = {this.validate}
                        value = {this.state.status}
                    />

                    <InputField 
                        label = "medium"
                        className = "medium text-input"
                        id="medium-input" 
                        type="text"
                        name="medium"
                        placeholder=""
                        handleInputChange={this.handleChange}
                        validate = {this.validate}
                        value = {this.state.medium}
                    />

                    <InputField 
                        label = "subject"
                        className = "subject text-input"
                        id="subject-input" 
                        type="text"
                        name="subject"
                        placeholder=""
                        handleInputChange={this.handleChange}
                        validate = {this.validate}
                        value = {this.state.subject}
                    />

                    <InputField 
                        label = "type"
                        className = "type text-input"
                        id="type-input" 
                        type="text"
                        name="type"
                        placeholder=""
                        handleInputChange={this.handleChange}
                        validate = {this.validate}
                        value = {this.state.type}
                    />

                    <InputField 
                        label = "size"
                        className = "size text-input"
                        id="type-input" 
                        type="text"
                        name="size"
                        placeholder=""
                        handleInputChange={this.handleChange}
                        validate = {this.validate}
                        value = {this.state.size}
                    />

                    <InputField 
                        label = "Infobox ID"
                        className = "infobox_id text-input"
                        id="type-input" 
                        type="text"
                        name="infobox_id"
                        placeholder=""
                        handleInputChange={this.handleChange}
                        validate = {this.validate}
                        value = {this.state.infobox_id}
                    />

                    <InputField 
                        label = "orientation"
                        className = "orientation text-input"
                        id="orientation-input" 
                        type="text"
                        name="orientation"
                        placeholder=""
                        handleInputChange={this.handleChange}
                        validate = {this.validate}
                        value = {this.state.orientation}
                    />

                    <InputField 
                        label = "price"
                        className = "price text-input"
                        id="price-input" 
                        type="number"
                        name="price"
                        placeholder=""
                        handleInputChange={this.handleChange}
                        validate = {this.validate}
                        value = {this.state.price}
                    />

                    <InputField 
                        id="original-img-input" 
                        type="hidden"
                        name="original_img"
                        validate = {this.validate}
                        value = {this.state.original_img}
                    />

                    <InputField 
                        id="painting-sm-input" 
                        type="hidden"
                        name="painting_sm"
                        validate = {this.validate}
                        value = {this.state.painting_sm}
                    />

                    <InputField 
                        id="painting-lg-input" 
                        type="hidden"
                        name="painting_lg"
                        validate = {this.validate}
                        value = {this.state.painting_lg}
                    />
                </form>

                <UploadFile 
                    setUrl={this.setFileUrl}
                    showMessage={this.toggleMessage}
                    label="Original Image"
                    name="original_img"
                />

                { this.state.original_img &&
                    <DisplayImage 
                        url={this.state.original_img}
                        title="Original Image"
                    />
                }

                <UploadFile 
                    setUrl={this.setFileUrl}
                    showMessage={this.toggleMessage}
                    label="Small Painting"
                    name="painting_sm"
                />

                { this.state.painting_sm &&
                    <DisplayImage 
                        url={this.state.painting_sm}
                        title="Small painting"
                    />
                }

                <UploadFile 
                    setUrl={this.setFileUrl}
                    showMessage={this.toggleMessage}
                    label="Large Painting"
                    name="painting_lg"
                />

                { this.state.painting_lg &&
                    <DisplayImage 
                        url={this.state.painting_lg}
                        title="Large Painting"
                    />
                }

                <Button 
                        id = "add-artwork-btn"
                        className = "add-blog-btn btn form-btn"
                        onClick = {this.handleSubmit}
                        title = "Add New Artwork"
                    />

            </div>
        )
    }
}

export default AddArtwork;