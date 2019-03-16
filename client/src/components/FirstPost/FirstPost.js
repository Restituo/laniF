import React from 'react';

const FirstPost = props => (

            <div className="card w-75 mx-auto">
                <div className = "card-header">
                    Posted by : {props.author}
                </div>
                <div className="card-body">    
                    <p className ="card-text">{props.description}</p>
                </div>
            </div>
        )


export default FirstPost