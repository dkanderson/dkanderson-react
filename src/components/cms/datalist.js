import React, { Component } from 'react';

class DataList extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentSelection: this.props.currentSelection
        }
    }

    handleClick(currentSelection){
        this.setState({
            currentSelection
        })
    }

    render(){
        return(
            <div>
                { this.state.currentSelection === "dashboard" &&
                    <h1>{this.state.currentSelection}</h1>
                }
                { this.state.currentSelection === "blog-list" &&
                    <h1>{this.state.currentSelection}</h1>
                }
                { this.state.currentSelection === "add-new-blog" &&
                    <h1>{this.state.currentSelection}</h1>
                }
                { this.state.currentSelection === "artwork-list" &&
                    <h1>{this.state.currentSelection}</h1>
                }
                { this.state.currentSelection === "add-new-artwork" &&
                    <h1>{this.state.currentSelection}</h1>
                }
                { this.state.currentSelection === "project-list" &&
                    <h1>{this.state.currentSelection}</h1>
                }
                { this.state.currentSelection === "add-new-project" &&
                    <h1>{this.state.currentSelection}</h1>
                }
                { this.state.currentSelection === "comments-list" &&
                    <h1>{this.state.currentSelection}</h1>
                }
                { this.state.currentSelection === "user-list" &&
                    <h1>{this.state.currentSelection}</h1>
                }
                { this.state.currentSelection === "add-new-user" &&
                    <h1>{this.state.currentSelection}</h1>
                }
            </div>
            
        )
    }
}

export default DataList;