import styled from 'styled-components'

const Parts = {
    Page : styled.div`
    ${props => props.display==="none" ? "display: none" : ""};
    ${props => props.main ? "display: flex" : ""};
    ${props => props.main ? "margin-left: 15px" : ""};
    ${props => props.main ? "width: 95vw" : ""};
    ${props => props.main ? "height: 88vh" : ""};
    ${props => props.main ? "min-height: 450px" : ""};
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
        padding: 20px;
        border-radius: 10px;
        position: relative;
        z-index: 2;
        background-color: rgb(185, 185, 185);
        width: 100vw;
        min-width: 330px;
        height: auto;
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
        ${props => props.up ? "margin: 0 10vw 0 10px" : ""};
        ${props => props.up ? "justify-content: space-between" : ""};
        ${props => props.up ? "align-items: center" : ""};
        ${props => props.up ? "width: 95vw" : ""};
        ${props => props.up ? "padding: 5px" : ""};
    `,
    Card : styled.div`
        width: 40vw;
        height: 100px;
        background-color: white;
        border: 1px solid rgb(240,240,240);
        border-radious: 5px;
    `,
    ModalBackground : styled.div`
        z-index: ${props => props.message ? "7" : "5"};
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background-color: #a2a2a2c7;
        display: ${props => props.display==="none" ? "none" : "flex"};
        align-items: center;
        justify-content: center;
    `,
}

export default Parts;
