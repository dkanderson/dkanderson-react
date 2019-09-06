import React, { Component } from 'react';
import { ReactComponent as EditSVG } from './svg/edit.svg';
import { ReactComponent as DeleteSVG } from './svg/garbage.svg';

class ListArtwork extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
        this.getArtworkData = this.getArtworkData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.deleteArtwork = this.deleteArtwork.bind(this);
    }

    componentWillMount(){
        this.getArtworkData();
    }

    getArtworkData(){
        fetch('/api/artwork')
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
            this.props.handleClick(e.currentTarget.dataset.type, e.currentTarget.dataset.id, "artwork");
        } else {
            this.deleteArtwork(e.currentTarget.dataset.id);
        }     
    }

    deleteArtwork(id){
        fetch(`/api/artwork/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if(response.status === 200) {
                this.getArtworkData();
            }
        })
        .catch(error => {
            console.error(error);
        })
    }

    populate(data){
        return data.map((artwork) => {
            return (
                <li className="artwork list-item" key={artwork.id}>
                    <span onClick={this.handleClick} data-type="edit" data-id={artwork.id} className="link">{artwork.title.slice(0, 20) + (artwork.title.length >= 20 ? '...' : '')}</span>
                    <span className="button-wrapper">
                        <button onClick={this.handleClick} className="edit-btn btn" data-type="edit" data-id={artwork.id}>
                            <i className="button-icon"><EditSVG /></i>
                            <span className="button-title">edit</span>
                        </button>
                        <button onClick={this.handleClick} className="delete-btn btn" data-type="delete" data-id={artwork.id}>
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

export default ListArtwork;