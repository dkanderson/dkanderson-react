import React, { Component } from 'react';
import { ReactComponent as EditSVG } from './svg/edit.svg';
import { ReactComponent as DeleteSVG } from './svg/garbage.svg';
import ConfirmDelete from './confirm-delete';

class ListUsers extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
        this.getUserData = this.getUserData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.toggleConfirm = this.toggleConfirm.bind(this);
    }

    componentWillMount(){
        this.getUserData();
    }

    getUserData(){
        fetch('/api/users')
            .then(response => response.json())
            .then((response) => {
                this.setState({
                    data: response
                })
            })
            .catch((error) => {
                console.error(error);
            })
    }

    handleClick(e){
        if(e.currentTarget.dataset.type === 'edit'){
            this.props.handleClick(e.currentTarget.dataset.type, e.currentTarget.dataset.slug, "user");
        } else {
            this.deleteUser(e.currentTarget.dataset.slug);
        }     
    }

    deleteUser(id){
        this.setState({
            toggleConfirm: true,
            toggleId: id
        })
    }

    toggleConfirm(){
        this.setState({
            toggleConfirm: false,
            toggleId: undefined
        })
    }

    populate(data){
        return data.map((user) => {
            return (
                <li className="user-list list-item" key={'key_' + user._id}>
                    { (this.state.toggleId === user.username ) && 
                        <ConfirmDelete type="users" 
                                    identifier={user.username} 
                                    title={user.username} 
                                    callback={this.getUserData} 
                                    handleCancel={this.toggleConfirm} 
                                    showMessage={this.state.toggleConfirm} />
                    }
                    <span className="link">{user.username.slice(0, 20) + (user.username.length >= 20 ? '...' : '')}</span>
                    <span className="button-wrapper">
                        <button onClick={this.handleClick} className="edit-btn btn" data-type="edit" data-slug={user.username}>
                            <i className="button-icon"><EditSVG /></i>
                            <span className="button-title">edit</span>
                        </button>
                        <button onClick={this.handleClick} className="delete-btn btn" data-type="delete" data-slug={user.username}>
                            <i className="button-icon"><DeleteSVG /></i>
                            <span className="button-title">delete</span>
                        </button>
                    </span>
                </li>
            )
        })
    }

    render(){
        return(
            <ul className="data-list">
                {this.populate(this.state.data)}
            </ul>
        )
    }
}

export default ListUsers;