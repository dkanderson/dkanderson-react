import React, { Component } from 'react';
import ListBlogs from './list-blogs';
import AddNewblog from './add-blog';
import ListArtwork from './list-artwork';
import ListProjects from './list-projects';
import ListComments from './list-comments';
import ListUsers from './list-users';
import UpdateBlog from './update-blog';
import AddUser from './add-user';
import AddNewArtWork from './add-artwork';
import UpdateArtwork from './update-artwork';
import AddProject from './add-project';
import UpdateProject from './update-project';
import UpdateUser from './update-user';
import { ReactComponent as BlogSVG } from './svg/book.svg';
import { ReactComponent as WorkSVG } from './svg/gears.svg';
import { ReactComponent as ArtworkSVG } from './svg/photo-camera.svg';
import { ReactComponent as UserSVG } from './svg/user.svg';
import { ReactComponent as CommentSVG } from './svg/speech-bubble.svg';

class CMSnav extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            isActive: false,
            currentSelection: "dashboard"
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleListClick = this.handleListClick.bind(this);
    }

    componentWillMount(){
        let cSelect = '';

        if (window.location.hash.slice(1) === ''){
            cSelect = "dashboard";
        } else {
            cSelect = window.location.hash.slice(1);
        }
        
        this.setState({
            currentSelection: cSelect
        })

        if(!this.props.isLoggedIn){
            fetch('api/authenticate')
                .then(res => res.json())
                .then(res => {
                    if (res.message === "authenticated" ) {
                        this.setState({
                            isLoggedIn: true
                        })
                    } else {
                        window.location.href = '/admin'
                    }
                })
                .catch(console.error)
        }
    }

    handleClick(e){
        this.setState({
            currentSelection: e.currentTarget.dataset.selected
        })
    }

    handleListClick(type, identifier, dataType){
        if(dataType === "blog"){
            this.setState({
                currentSelection: 'edit-blog'
            })
        }
        if(dataType === 'artwork'){
            this.setState({
                currentSelection: 'edit-artwork'
            })
        }
        if(dataType === 'project'){
            this.setState({
                currentSelection: 'edit-project'
            })
        }
        if(dataType === 'user'){
            this.setState({
                currentSelection: 'edit-user'
            })
        }
        this.setState({
            identifier
        })
    }
    
    render(){
        return(
            <div className="container cms">
                <div className="cms-wrapper">
                    <div className="cms-navigation">
                        
                            <ul className="cms-nav-list">
                                <li>
                                    <span><i className="icon-wrap"><BlogSVG /></i> <span className="nav-item-name">Blogs</span></span>
                                    <div className="sub-nav">
                                        <a href="#blog-list" className="link" onClick={this.handleClick} data-selected="blog-list" to="/admin/list-blogs">Blog List</a>
                                        <a href="#add-new-blog" className="link" onClick={this.handleClick} data-selected="add-new-blog" to="/admin/list-blogs">Add New Blog</a>
                                    </div>
                                </li>
                                <li>
                                    <span><i className="icon-wrap"><ArtworkSVG /></i><span className="nav-item-name">Artwork</span></span>
                                    <div className="sub-nav">
                                        <a href="#artwork-list" className="link" onClick={this.handleClick} data-selected="artwork-list" to="/admin/list-artwork">Artwork List</a>
                                        <a href="#add-new-artwork" className="link" onClick={this.handleClick} data-selected="add-new-artwork" to="/admin/list-artwork">Add New Artwork</a>
                                    </div>
                                </li>
                                <li>
                                    <span><i className="icon-wrap"><WorkSVG /></i><span className="nav-item-name">Projects</span></span>
                                    <div className="sub-nav">
                                        <a href="#project-list" className="link" onClick={this.handleClick} data-selected="project-list" to="/admin/list-projects">Project List</a>
                                        <a href="#add-new-project" className="link" onClick={this.handleClick} data-selected="add-new-project" to="/admin/list-projects">Add New Project</a>
                                    </div>
                                </li>
                                <li>
                                    <span><i className="icon-wrap"><CommentSVG /></i><span className="nav-item-name">Comments</span></span>
                                    <div className="sub-nav">
                                        <a href="#comment-list" className="link" onClick={this.handleClick} data-selected="comment-list" to="/admin/list-comments">Comments List</a>
                                    </div>
                                </li>
                                <li>
                                    <span><i className="icon-wrap"><UserSVG /></i><span className="nav-item-name">Users</span></span>
                                    <div className="sub-nav">
                                        <a href="#user-list" className="link" onClick={this.handleClick} data-selected="user-list" to="/admin/list-users">User List</a>
                                        <a href="#add-new-user" className="link" onClick={this.handleClick} data-selected="add-new-user" to="/admin/list-users">Add New User</a>
                                    </div>
                                </li>
                            </ul>
                        
                    </div>
                    <div className="data-wrapper">
                        <div>
                            { this.state.currentSelection === "dashboard" &&
                                <ListBlogs handleClick={this.handleListClick} />
                            }
                            { this.state.currentSelection === "blog-list" &&
                                <ListBlogs handleClick={this.handleListClick} />
                            }
                            { this.state.currentSelection === "add-new-blog" &&
                                <AddNewblog />
                            }
                            { this.state.currentSelection === "edit-blog" &&
                                <UpdateBlog slug={this.state.identifier} />
                            }

                            { this.state.currentSelection === "artwork-list" &&
                                <ListArtwork handleClick={this.handleListClick} />
                            }
                            { this.state.currentSelection === "add-new-artwork" &&
                                <AddNewArtWork />
                            }
                            { this.state.currentSelection === "edit-artwork" &&
                                <UpdateArtwork id={this.state.identifier} />
                            }
                            { this.state.currentSelection === "project-list" &&
                                <ListProjects handleClick={this.handleListClick} />
                            }
                            { this.state.currentSelection === "add-new-project" &&
                                <AddProject />
                            }
                            { this.state.currentSelection === "edit-project" &&
                                <UpdateProject id={this.state.identifier} />
                            }
                            { this.state.currentSelection === "comment-list" &&
                                <ListComments />
                            }
                            { this.state.currentSelection === "user-list" &&
                                <ListUsers handleClick={this.handleListClick} />
                            }
                            { this.state.currentSelection === "add-new-user" &&
                                <AddUser />
                            }
                            { this.state.currentSelection === "edit-user" &&
                                <UpdateUser slug={this.state.identifier} />
                            }
                        </div>
                    </div>
                </div>
                
            </div>

        );
    }
}

export default CMSnav;