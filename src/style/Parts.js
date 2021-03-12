import styled from 'styled-components'
import bodyImage from '../images/body.png'

const Parts = {
    Page : styled.div`
    ${props => props.display==="none" ? "display: none" : ""};
    ${props => props.main ? "display: flex" : ""};
    ${props => props.main ? "margin-left: 35px" : ""};
    ${props => props.main ? "width: 92vw" : ""};
    ${props => props.main ? "height: 85vh" : ""};
    ${props => props.main ? "min-height: 450px" : ""};
    `,
    Button : styled.div`
        position:relative;
        text-transform: uppercase;
        z-index: ${props => props.clicked==="clicked" ? "3" : "1"};
        margin: ${props => props.left ? "0px -7px 5px 0px" : " 0px 0px 5px -7px"};
        height:100px;
        width:50px;
        writing-mode: vertical-rl;
        text-orientation: upright;
        color: black;
        font-size: 0.8rem;
        font-weight: 800;
        text-align: center;
        letter-spacing :-3px;
        line-height: ${props => props.left ? "4.5" : "3"};
        background-color: ${props => props.color ? props.color : 'white'};
        ${props => props.clicked==="clicked" ? "" : "box-shadow:inset 15px -1px 8px rgba(0, 0, 0, 0.3)" };
        ${props => (props.clicked!=="clicked" && props.left) ? "box-shadow:inset -15px -1px 10px rgba(0, 0, 0, 0.3)" : "" };
        border-radius: 2px;
    `
    ,
    Body : styled.div`
        position:relative;
        box-shadow:inset 3px 3px 8px rgba(0, 0, 0, .1);
        background-image: url(${bodyImage});
        background-size: cover;
        background-position: 50% 0%;
        padding: 20px;
        padding-top: 10px;
        border-radius: 10px;
        position: relative;
        z-index: 2;
        background-color: rgb(185, 185, 185);
        width: 100vw;
        min-width: 570px;
        height: auto;
        min-height: 500px;
        margin-right: -5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        float: left;
    `,
    Board : styled.div`
        width: 45%;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
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
    Info : styled.div`
    margin:0;
    height:30px;
    width:80px;
    color: black;
    text-align: center;
    background-color: ${props => props.clicked==="clicked" ? "rgb(185, 185, 185)" : "gray"};
`,
}

export default Parts;
