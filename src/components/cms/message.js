import React from 'react';

function Message(props){
    return(
        <div id="message-wrapper" className={`message-wrapper ${props.messageType}`}>
            <div id="form-message" className={`message ${props.messageType}`}><strong>{props.messageType}: </strong>{props.message}</div>
            {
                props.messageObject && 
                <ul className="error-message-list">
                    { 
                        props.messageObject.messages.map((msg, index)=>{
                            return(<li key={`msg-${index}`}>{msg}</li>)
                        })
                    }
                </ul>
            }
        </div>
    );
}

export default Message;