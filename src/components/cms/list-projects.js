import React, { Component } from 'react';
import { ReactComponent as EditSVG } from './svg/edit.svg';
import { ReactComponent as DeleteSVG } from './svg/garbage.svg';
import ConfirmDelete from './confirm-delete';

class ListProjects extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
        this.getWorkData = this.getWorkData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.deleteWork = this.deleteWork.bind(this);
        this.toggleConfirm = this.toggleConfirm.bind(this);
    }

    componentWillMount(){
       this.getWorkData();
    }

    getWorkData(){
        fetch('/api/work')
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
            this.props.handleClick(e.currentTarget.dataset.type, e.currentTarget.dataset.id, "project");
        } else {
            this.deleteWork(e.currentTarget.dataset.id);
        }     
    }

    deleteWork(id){
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
        return data.map((work) => {
            return (
                <li className="work list-item" key={work.id}>
                    { (+this.state.toggleId === work.id ) && 
                        <ConfirmDelete type="work" 
                                    identifier={work.id} 
                                    title={work.content} 
                                    callback={this.getWorkData} 
                                    handleCancel={this.toggleConfirm} 
                                    showMessage={this.state.toggleConfirm} />
                    }
                    <span className="link">{work.title.slice(0, 20) + (work.title.length >= 20 ? '...' : '')}</span>
                    <span className="button-wrapper">
                        <button onClick={this.handleClick} className="edit-btn btn" data-type="edit" data-id={work.id}>
                            <i className="button-icon"><EditSVG /></i>
                            <span className="button-title">edit</span>
                        </button>
                        <button onClick={this.handleClick} className="delete-btn btn" data-type="delete" data-id={work.id}>
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

export default ListProjects;