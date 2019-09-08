import React, { Component } from 'react';
import { ReactComponent as EditSVG } from './svg/edit.svg';
import { ReactComponent as DeleteSVG } from './svg/garbage.svg';
import ConfirmDelete from './confirm-delete';
 

class ListBlogs extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
        this.handleClick = this.handleClick.bind(this);
        this.getBlogData = this.getBlogData.bind(this);
        this.deleteBlogPost = this.deleteBlogPost.bind(this);
        this.toggleConfirm = this.toggleConfirm.bind(this);
    }

    componentWillMount(){
        this.getBlogData();
    }

    getBlogData(){
        fetch('/api/blog')
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
            this.props.handleClick(e.currentTarget.dataset.type, e.currentTarget.dataset.slug, "blog");
        } else {
            this.deleteBlogPost(e.currentTarget.dataset.slug);
        }     
    }

    deleteBlogPost(slug){
        this.setState({
            toggleConfirm: true,
            toggleId: slug
        })
    }

    toggleConfirm(){
        this.setState({
            toggleConfirm: false,
            toggleId: undefined
        })
    }


    populate(data){
        return data.map((blog) => {
            return (
                <li className="blog list-item" key={blog.id}>
                    { (this.state.toggleId === blog.slug ) && 
                        <ConfirmDelete type="blog" 
                                    identifier={blog.slug} 
                                    title={blog.title} 
                                    callback={this.getBlogData} 
                                    handleCancel={this.toggleConfirm} 
                                    showMessage={this.state.toggleConfirm} />
                    }
                    <span className="link" onClick={this.handleClick} data-type="edit" data-slug={blog.slug}>{blog.title.slice(0, 20) + (blog.title.length >= 20 ? '...' : '')}</span>
                    <span className="button-wrapper">
                        <button onClick={this.handleClick} className="edit-btn btn" data-type="edit" data-slug={blog.slug}>
                            <i className="button-icon"><EditSVG /></i>
                            <span className="button-title">edit</span>
                        </button>
                        <button onClick={this.handleClick} className="delete-btn btn" data-type="delete" data-slug={blog.slug}>
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

export default ListBlogs;