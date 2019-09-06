import React, { Component } from 'react';

class CheckBoxgroup extends Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e){
        this.props.handleInputChange(e.currentTarget.checked, e.currentTarget.value);
    }

    render(){
        return(
            <div className="checkbox-group-wrapper">
                <label className="cf">HTML
                <input 
                    type="checkbox"
                    name={this.props.name}
                    value="HTML"
                    className="html-checkbox checkbox"
                    onChange={this.handleChange}
                    checked = {this.props.value.find(el => el === 'HTML') === 'HTML' ? 'checked' : ''}
                /><span className="checkMark"></span></label>
                
                <label className="cf">CSS
                <input 
                    type="checkbox"
                    name={this.props.name}
                    value="CSS"
                    className="css-checkbox checkbox"
                    onChange={this.handleChange}
                    checked = {this.props.value.find(el => el === 'CSS') === 'CSS' ? 'checked' : ''}
                /><span className="checkMark"></span></label>

                <label className="cf">Javascript
                <input 
                    type="checkbox"
                    name={this.props.name}
                    value="JavaScript"
                    className="javascript-checkbox checkbox"
                    onChange={this.handleChange}
                    checked = {this.props.value.find(el => el === 'JavaScript') === 'JavaScript' ? 'checked' : ''}
                /><span className="checkMark"></span></label>

                <label className="cf">Wordpress
                <input 
                    type="checkbox"
                    name={this.props.name}
                    value="WordPress"
                    className="wordpress-checkbox checkbox"
                    onChange={this.handleChange}
                    checked = {this.props.value.find(el => el === 'WordPress') === 'WordPress' ? 'checked' : ''}
                /><span className="checkMark"></span></label>

                <label className="cf">Photoshop
                <input 
                    type="checkbox"
                    name={this.props.name}
                    value="Photoshop"
                    className="photoshop-checkbox checkbox"
                    onChange={this.handleChange}
                    checked = {this.props.value.find(el => el === 'Photoshop') === 'Photoshop' ? 'checked' : ''}
                /><span className="checkMark"></span></label>
            </div>
        )
    }
}

export default CheckBoxgroup;