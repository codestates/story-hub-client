import styled from 'styled-components'

const Parts = {
    Button : styled.div`
        z-index: 1;
        margin:0;
        height:100px;
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
    `,
    Body : styled.div`
        border-radius: 10px;
        position: relative;
        margin-right: -10px;
        z-index: 2;
        background-color: rgb(185, 185, 185);
        width: ${props => props.left ? "55vw" : "80vw"};
        height: 80vh;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        float: left;
    `,
    Board : styled.div`
        width: 45%;
        display: flex;
        flex-direction: column;
    `,
    Nav : styled.div`
        padding-top: 10px;
        display: flex;
        flex-direction: ${props => props.up ? "row" : "column"};
        float: left;
        ${props => props.up ? "justify-content: space-evenly" : ""};
    `,

}

export default Parts;
