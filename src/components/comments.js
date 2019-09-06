import React, { Component } from 'react';
import defaultAvatar from '../img/defAv.png';
import AddComment from './addComment';

class Comments extends Component{
    constructor(props){
      super(props);
      this.state = {
        data: []
      }
    }

    componentWillMount(){
      this.setState({
        data: this.props.data
      });
    }

    displayComments(data){

        return(
          <div>
            <h3>{ data.length === 1 ? 'One Response to ' : `${data.length} Responses to `}{ this.props.title }</h3>
            <ol className="media-list">
              { 
                data.map((comment, index) => {
                  
                  return(
                    <li className={`comment ${index%2 ? 'odd' : 'even'}`} key={`comment_${index}`}>
                        <img src={defaultAvatar} alt={comment.username} className="avatar" height="64" width="64" />
                        <div className="media-body">
                          <h4 className="media-heading">{comment.username}</h4>
                          <time dateTime={comment.comment_date}>
                              {comment.date}
                          </time>
                          <p>{comment.content}</p>
                          <a href="#comment" className="comment-reply-link" aria-label={`reply to ${comment.username}`}>Reply</a>
                        </div>
                    </li>
                  );
                })
              }
            </ol>
          </div>
        );

    }

    render(){
        return(
          <section id="comments">
            

            { this.props.data &&
               this.displayComments(this.props.data) 
            }

            <AddComment blog_slug={this.props.slug} blog_id={ this.props.blog_id} commentCount={this.props.commentCount} onCommentAdd={this.props.onCommentAdd} />

            
          </section>
        );
    }
}

export default Comments;