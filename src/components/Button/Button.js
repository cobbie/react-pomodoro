import React from 'react';
import './style.css'
import dropdownButton from '../../resources/dropdown-button.svg'

const renderDropdown = containsDropdown => {
    if(containsDropdown){
        return(
            <div className="dropdown-button"><img src={dropdownButton} /></div>
        )
    }
}
const Button = props => {
    return(
        <div className={props.isSmall ? "container" : "large-container"}>
            <div className= {props.isSmall ? "sb-flexbox" : "bb-box"}>
                <div className="button-name">{props.buttonName}</div>
                {renderDropdown(props.containsDropdown)}
            </div>
        </div>
    )
}

export default Button;