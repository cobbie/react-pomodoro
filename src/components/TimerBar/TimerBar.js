import React from 'react';
import styled, {css } from 'styled-components';
import { defaultCipherList } from 'constants';

const TimerBar = styled.div`

 margin-top: 410px;
 margin-left: 32px;
 background: #E35252;
 position: absolute;
 height: 7px;
 width: ${props => props.width}`;




export default TimerBar; 

