import React, { Component } from 'react';
import Button from './button';

class ConfirmDelete extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            showMessage: this.props.showMessage,
            animClass: 'slide-in'
        }
        this.deleteConfirmed = this.deleteConfirmed.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleConfirm(){
        this.deleteConfirmed();
    }

    handleCancel(){
        this.props.handleCancel();
    }

    deleteConfirmed(){

        fetch(`/api/${this.props.type}/${this.props.identifier}`, {
            method: 'DELETE'
        })
        .then(response => {
            if(response.status === 200) {
                this.props.callback();
            }
        })
        .catch(error => {
            console.error(error);
        })
    }

    render(){
        return(
            <div>
                { this.state.showMessage &&
                    <div className={`confirm-delete-wrapper ${this.state.animClass}`}>
                        <span className="confirm-message">Confirm delete?</span>
                        <span className="confirm-delete-button-wrapper">
                            <Button className="btn confirm" onClick={this.handleConfirm} title="yes" />
                            <Button className="btn cancel" onClick={this.handleCancel} title="no" /> 
                        </span>
                    </div>
                }
            </div>
        );
    }
}

export default ConfirmDelete;