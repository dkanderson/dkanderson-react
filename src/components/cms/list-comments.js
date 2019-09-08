import React, { Component } from 'react';
import { ReactComponent as DeleteSVG } from './svg/garbage.svg';
import ConfirmDelete from './confirm-delete';

class ListComments extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            toggleConfirm: false
        }
        this.getCommentData = this.getCommentData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.toggleConfirm = this.toggleConfirm.bind(this);
    }

    componentWillMount(){
        this.getCommentData();
    }

    getCommentData(){
        fetch('/api/comment')
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
        this.deleteComment(e.currentTarget.dataset.id);
    }

    deleteComment(id){
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
        return data.map((comment) => {
            return (
                <li className="comment-list list-item" key={comment.id}>
                    { (+this.state.toggleId === comment.id ) && 
                        <ConfirmDelete type="comment" 
                                    identifier={comment.id} 
                                    title={comment.content} 
                                    callback={this.getCommentData} 
                                    handleCancel={this.toggleConfirm} 
                                    showMessage={this.state.toggleConfirm} />
                    }
                    <span className="link">{comment.content.slice(0, 20) + (comment.content.length >= 20 ? '...' : '')}</span>
                    <span className="button-wrapper">
                        <button onClick={this.handleClick} className="delete-btn btn" data-type="delete" data-id={comment.id}>
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

export default ListComments;