import React from 'react';

function Message(props){
    return(
        <div id="message-wrapper">
            <div id="form-message" className={`message ${props.messageType}`}><strong>{props.messageType}: </strong>{props.message}</div>
            {
                props.messageObject && 
                <ul className="error-message-list">
                    { props.messageObject.username.hasError && 
                        <li>{props.messageObject.username.message}</li>
                    }
                    { props.messageObject.email.hasError && 
                        <li>{props.messageObject.email.message}</li>
                    }
                    { props.messageObject.content.hasError && 
                        <li>{props.messageObject.content.message}</li>
                    }
                </ul>
            }
        </div>
    );
}

export default Message;