import React, { Component } from 'react';
import { ReactComponent as DeleteSVG } from './svg/garbage.svg';

class ListComments extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
        this.getCommentData = this.getCommentData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
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
        fetch(`/api/comment/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if(response.status === 200) {
                this.getCommentData();
            }
        })
        .catch(error => {
            console.error(error);
        })
    }


    populate(data){
        return data.map((comment) => {
            return (
                <li className="comment-list list-item" key={comment.id}>
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