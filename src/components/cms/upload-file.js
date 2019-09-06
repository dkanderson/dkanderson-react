import React from 'react';

function UploadFile(props){
   
    function handleFileUpload(e){
        e.preventDefault();
        const fileData = new FormData();

        let fileId = `artworkFile-${props.name}`;
        
        let artworkFile = document.getElementById(fileId) ? document.getElementById(fileId).files[0] : undefined;
        
        
        if(!artworkFile){
            props.showMessage({message: "No file was selected", messageType: "error"});
        } else {
            fileData.append("artwork", artworkFile);
            fetch('api/upload', {
                method: 'POST',
                body: fileData
            })
            .then(response => response.json())
            .then((response) => {
                if( response.status === 200 ) {
                    props.setUrl(response.fileName, true, props.name);
                }
            })
            .catch ((error) => {
                console.error(error);
            });
        }

    }
    
    return(
        <div className="form-wrapper upload-file-wrapper">
            <form className="form upload">
                { props.label && 
                    <label className="label" htmlFor={props.name}>{props.label}</label> }
                <div className="input-file-wrapper cf">
                    <input id={`artworkFile-${props.name}`} className="input fancy input-file input-upload-artwork" name={props.name} type="file" />
                    <button className="btn button-upload-file button-upload-artwork" onClick={handleFileUpload}>upload</button>
                </div>
            </form>
        </div>
    );
    

}

export default UploadFile;