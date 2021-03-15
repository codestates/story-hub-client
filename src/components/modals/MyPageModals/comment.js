import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { modalMoved, storyDetailSaved, commitDetailSaved, setMyPageProps } from '../../../actions'
import Parts from '../../../style/Parts'
import styled from 'styled-components'
import background from '../../../images/note1.png'

const ModalFrame = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 300px;
    height: 278px;
    background-color: transparent;
    background-image: url(${background});
    background-size: 100%;
    padding: 10px;
    font-size: 0.9rem;
    .close {
        align-self: start;
        margin: 25px 0 -35px 10px;
        background-color: transparent;
        font-weight: 400;
        font-size: 1.5rem;
        border: none;
    }
    .upCount {
        margin: -10px 20px 0 auto;
    }
    h2 {
        margin-top: 10px;
        text-transform: uppercase;
        font-weight: 900;
        font-size: 1rem;
        border-bottom: 1px solid black;
        width: 140px;
        text-align: center;
        padding-bottom: 5px;
    }
    .content {
        width : 250px;
        height: 35px;
        margin: 10px;
        font-size: 0.8rem;
        background-color: #fff8eda1;
        border: 1px solid rgba(255,0,0,0.3);
        border-radius: 20px;
        padding: 15px;
        white-space: normal;
        overflow-y: hidden;
    }
    .createdAt {
        border-bottom: 3px double black;
        width: 90%;
        text-align: right;
        padding-bottom: 3px;
    }
    .toDetail{
        margin: auto 0 20px 0;
        width: 80%;
        height: 50px;
        border-radius: 15px;
    }
`
const ButtonWrap = styled.div`
width: 100%;
display: flex;
justify-content: center;
padding-top: 10px;
  button {
    display: inline-block;
    background: transparent;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #d2a638;
    padding: 3px;
    transition: all 0.5s ease-out;
    background: linear-gradient(
      270deg,
      rgba(223, 190, 106, 0.8),
      rgba(146, 111, 52, 0.8),
      rgba(34, 34, 34, 0),
      rgba(34, 34, 34, 0)
    );
    background-position: 1% 50%;
    background-size: 300% 300%;
    text-decoration: none;
    border: 3px solid rgba(223, 190, 106, 1);
    border-radius: 5px;
    font: 900 0.8rem serif;
  }

  button:hover {
    color: #fff;
    border: 3px solid rgba(223, 190, 106, 0);
    color: $white;
    background-position: 96% 50%;
  }
`;

const myComment= (props) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const { myPageProps } = state.pageReducer;
    const history = useHistory();

    return (
        <Parts.ModalBackground display={props.display==="none" ? "none" : ""}>
            <ModalFrame>
                <button className="close" onClick={() => {
                    dispatch(modalMoved(""))
                    dispatch(setMyPageProps({}))
                }}>x</button>
                <div className="upCount">{myPageProps.upCount}</div>
                <h1 style={{textAlign:'center', padding:'0 0 5px 0'}}>My Comment</h1>
                <div className="content">{myPageProps.content}</div>
                <div className="createdAt">DATE : {myPageProps.createdAt}</div>
                <ButtonWrap>
                    <button className="toDetail" onClick={() => {
                        if (myPageProps.commitIndex) {
                            const boardIndex = myPageProps.commitIndex
                            const result = axios({
                                url: 'http://localhost:4000/commit/list',
                                method: 'GET',
                                params: {
                                    boardIndex,
                                },
                            }).then( res => {
                                console.log(res.data)
                            })
                            
                            history.push('/commitdetail')
                        }
                        if (myPageProps.boardIndex) {
                            const boardIndex = myPageProps.boardIndex
                            const result = axios({
                                url: 'http://localhost:4000/board/detailcontent',
                                method: 'GET',
                                params: {
                                    boardIndex,
                                },
                            }).then( res => {
                                dispatch(storyDetailSaved(res.data.boardInfo[0].content))
                                history.push('/content')
                            })
                        }
                        dispatch(modalMoved(""))
                    }}>To the Detail</button>
                </ButtonWrap>
            </ModalFrame>
        </Parts.ModalBackground>
    )
};
        
export default myComment;
        