import React from 'react';

function DisplayImage(props){
    const image = `${process.env.PUBLIC_URL}/images/uploads/${props.url}`;
    return(
        <figure id={`figure-${props.title}`} className="figure uploaded-image">
            <img src={`${image}`} alt={props.title} />
        </figure>
    );
}

export default DisplayImage;