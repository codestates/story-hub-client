import styled, { css } from 'styled-components'

const button = styled.div`
    z-index: 1;
    margin:0;
    height:120px;
    width:50px;
    writing-mode: vertical-rl;
    text-orientation: upright;
    color: black;
    font-size: 0.9rem;
    text-align: center;
    letter-spacing :-6px;
    line-height: 3;

    background-color: ${props => props.clicked ? "rgb(185, 185, 185)" : "gray"};
    border-radius: ${props => props.left ? "25px 0px 0px 25px" : "0px 25px 25px 0px"};
`

export default button;
