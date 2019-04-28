import React from 'react';
import './style.css'

const Stat = props => {
    return(
        <div>{props.statName}: {props.stat}</div>
    )
}

export default Stat;