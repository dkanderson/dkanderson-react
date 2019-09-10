import React, { Component } from 'react';
import Comments from './comments';
import formatDate from '../helpers/formatDate';
import $ from 'jquery';
import Loading from './loading-animation';

class Blog extends Component{

    constructor(props){
        super(props);
        this.state = {
            blog: [],
            commentCount: 0
        }

        this.getCommentCount = this.getCommentCount.bind(this);
        this.formatBlogContent = this.formatBlogContent.bind(this);
    }

    componentWillMount(){

        this.getBlogData();  
    }

    componentDidMount(){
        $('.bg-bleed-wrap').addClass('blog-header');
    }

    componentWillUnmount(){

        $('.bg-bleed-wrap').removeClass('blog-header');
    }

    getBlogData(){
        
        let slug = window.location.pathname.slice(6);

        fetch(`/api/blog/${slug}`)
            .then(response => response.json())
            .then((response) => {
                this.setState({
                blog: response
            })
            this.getCommentCount(response.id);
        })
            .catch ((error) => {
                console.error(error);
            })
    }

    getCommentCount(id){

        fetch(`/api/comment`)
        .then(response => response.json())
        .then((response) => {

            let count = 0,
                commentList = [];
            if(id){
                response.map(comment => {
                    if(comment.blog_id === id){
                        count += 1;
                        commentList.push(comment);
                    }
                    
                    return null;
                });
            }
            
            this.setState({
                commentCount: count,
                comments: commentList
            })
        })
        .catch ((error) => {
            console.error(error);
        })   
    }

    formatBlogContent(content){
        var result = [];

        if(content.match(/<p>(.*?)<\/p>/g)){
             result = content.match(/<p>(.*?)<\/p>/g).map(function(val){
                return val.replace(/<\/?p>/g,'');
            });
        } else {
            result.push(content.replace(/(<([^>]+)>)/ig,""));
        }
        
        return result; 
    }


    displayBlog(blog){
        
        let blogDate = formatDate(blog.date);

        return (
            <div> 
                <article className="post" key={blog.id}>
                    <header>
                        <h2 className="entry-title">{blog.title}</h2>
                        <time className="post-date published" dateTime={blog.date}>
                            <p>
                                <strong>{blogDate.dd}</strong>
                                {blogDate.mm}       <span>{blogDate.yy}</span>
                            </p>
                        </time>
                        <a title="Comments" href="#comments" className="comments-link">
                            <span>{ this.state.commentCount }</span> Comments
                        </a>
                    </header>
                    <div className="entry-summary">
                       { this.formatBlogContent(blog.content).map(content => {
                                return(
                                    <p key={`para-${content.slice(0,15)}`} dangerouslySetInnerHTML={{__html: content}}></p>
                                );
                            })
                        }
                    </div>
                </article>
                <Comments data={ this.state.comments } title={blog.title} slug={blog.slug} blog_id={blog.id} lastId = {this.state.lastId}  commentCount={this.state.commentCount} onCommentAdd={this.getCommentCount} />
            </div>
        )
    }

    render(){
        return (
            <div>
                <div className="intro blog">
                    <div className="container">
                        <h1>Creative Ideas <em className="fancy">&amp;</em> Introspection</h1>
                    </div>
                </div>

                <div className="container">
                    { this.state.blog.title ? this.displayBlog(this.state.blog) : <Loading /> }
                </div>
            </div>
            
        );
    }
}

export default Blog;