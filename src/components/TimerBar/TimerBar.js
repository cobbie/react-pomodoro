import styled from 'styled-components';

const TimerBar = styled.div`

 margin-top: 410px;
 margin-left: 32px;
 background: ${props => props.color};
 position: absolute;
 height: 7px;
 width: ${props => props.width}`;
 
export default TimerBar; 

