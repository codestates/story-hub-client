import styled from 'styled-components'

const Parts = {
    Page : styled.div`
    white-space: nowrap;
    display: ${props => props.display==="none" ? "none" : "inline-block"};
    `,
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
        background-color: ${props => props.clicked==="clicked" ? "rgb(185, 185, 185)" : "gray"};
        border-radius: ${props => props.left ? "25px 0px 0px 25px" : "0px 25px 25px 0px"};
    `,
    Body : styled.div`
        padding: 10px;
        border-radius: 10px;
        position: relative;
        z-index: 2;
        background-color: rgb(185, 185, 185);
        width: ${props => props.width==="left" ? "75%" : "85%"};
        height: 80vh;
        margin-right: -5px;
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
        display: ${props => props.display==="none" ? "none" : "flex"};
        flex-direction: ${props => props.up ? "row" : "column"};
        float: left;
        ${props => props.left ? "margin-right: -5px" : ""};
        ${props => props.up ? "justify-content: space-between" : ""};
        ${props => props.up ? "align-items: center" : ""};
        ${props => props.up ? "width: 95vw" : ""};
        ${props => props.up ? "min-width: 450px" : ""};
        ${props => props.up ? "height: 30px" : ""};
        ${props => props.up ? "padding: 10px" : ""};
    `,

}

export default Parts;
