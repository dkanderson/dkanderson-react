import React, { Component } from 'react';
import $ from 'jquery';
import formatDate from '../helpers/formatDate';
import Loading from './loading-animation';

class BlogList extends Component{

    constructor(props){
        super(props);
        this.state = {
            data: [],
            comments: [],
            setFlag: false,
            loading: true
        };
    }

    componentWillMount(){

        fetch('/api/blog')
            .then(response => response.json())
            .then((response) => {
                this.setState({
                data: response
            })})
            .then(()=>{
                this.setState({
                    loading: false
                })
            })
            .catch ((error) => {
                console.error(error);
            })
            this.getComments();
    }

    componentDidMount(){
        $('.bg-bleed-wrap').addClass('blog-header');
    }

    componentWillUnmount(){
        $('.bg-bleed-wrap').removeClass('blog-header');
    }

    getComments(){
        fetch(`/api/comment`)
            .then(response => response.json())
            .then((response) => {
                this.setState({
                    comments: response,
                    setFlag: true
                })
            })
            .catch ((error) => {
                console.error(error);
            })
    }

    getCommentCount( slug ){

        let count = 0;

        this.state.comments.map(comment => {
            if(comment.blog_slug === slug){
                count += 1;
            }
        });

        return count;

    }

    populate(blogs){

        return blogs.map((blog) => {

            let slug = blog.title.toLowerCase().replace(/ /g,"-"),
                permalink = `${slug}`,
                blogDate = formatDate(blog.date);

            return (
                <article className="post" key={blog.id}>
                    <header>
                        <h2 className="entry-title"><a href={permalink}>{blog.title}</a></h2>
                        <time className="post-date published" dateTime={blog.date}>
                            <p>
                            <strong>{blogDate.dd}</strong>
                            {blogDate.mm}       <span>{blogDate.yy}</span>
                            </p>
                        </time>
                        <a title="Comments" href={permalink} className="comments-link">
                            <span>{ this.getCommentCount(slug) }</span> Comments
                        </a>
                    </header>
                    <div className="entry-summary" dangerouslySetInnerHTML={ {__html: `<p>${$(blog.content).text().slice(0, 300)}</p>`}}>
                    </div><a href={permalink} title={blog.title}>Continued</a>
                </article>
            );
        })

    }

    render(){
        return(
            <div>
                <div className="intro blog">
                    <div className="container">
                        <h1>Creative Ideas <em className="fancy">&amp;</em> Introspection</h1>
                    </div>
                </div>

                <div className="container not-relative">
                    { this.state.loading && 
                        <Loading heightOverride='100px' widthOverride='100px' /> }
                    {this.populate(this.state.data)}
                </div>
            </div>
        );
    }

}

export default BlogList;
