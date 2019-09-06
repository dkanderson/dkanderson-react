import React from 'react';

function Textarea(props){

    function handleChange(e){
        props.handleChange(e.target.value, e.target.name)
    }

    return(
        <fieldset className="fieldset">
            <div className="textarea-wrapper">
            { props.label && 
                <label className="label" htmlFor={props.name}>{props.label}:</label> }
                <div className="textarea-wrapper">
                    <textarea   name={props.name} 
                                id={props.id} 
                                className={props.className} 
                                value={props.value} 
                                rows={props.rows} 
                                aria-required={props.ariaRequired} 
                                onChange={handleChange}>
                    </textarea>
                </div>
            </div>
        </fieldset>
    )
}

export default Textarea;