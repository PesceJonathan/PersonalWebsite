import styled from "styled-components";

//Styled components
export const GameCard = styled.div`
    position: absolute;
    left: 15%;
    top: 35%;
    height: 30%;
    width: 70%;
    box-shadow: 2px;
    border-radius: 15px;
    z-index: 10;
    background-color: white;
    display: flex;
    flex-direction: column;
`

export const Title = styled.div`
    text-align: center;
    width: 100%;
    padding: 4px 0px;
    background-color: ${props => props.color};
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    font-size: 20px;
`
export const GameResult = styled.div`
    display: flex;
    height: 77px;
`

export const GameText = styled.div`
    justify-self: center;
    align-self: center;
    padding: 0px 10px;
`

export const green = "#769656";
export const red = "#b33430";
export const gray = "#a7a6a2";