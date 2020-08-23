import styled from "styled-components"

export const Card = styled.div<ICard>`
    height: 345px;
    width: 200px;
    background-color: #f1f1f1;
    border: 1px gray solid;
    border-radius: 10px;
    display: ${props => props.mobile ? "none" : "block"};
    margin-left: ${props => props.mobile ? "30px" : "0px"};

    @media (max-width: 768px) {
        display: ${props => props.mobile ? "block" : "none"};
    }

    @media (max-width: 480px) {
        margin-left: ${props => props.mobile ? "10px" : "0px"};
    }

    @media (max-width: 373px) {
        margin-left: 0px;
    }
`

interface ICard {
    mobile: boolean
}

export const MoveAndTime = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    height: 21px;
    padding: 5px 0px;
    margin: 0px 4px;
    width: calc(100% - 8px);
`

export const Moves = styled.div`
    overflow: auto;
    height: calc(100% - 24px);

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background: #666;
        border-radius: 20px;
    }

    &::-webkit-scrollbar-track {
        background: #ddd;
        border-radius: 20px;
    }
`

export const Move = styled.div`
    font-weight: 450;
    font-size: 16px;

`
export const Title = styled.div`
    height: fit-content;
    width: 100%;
    border-bottom: 1px black solid;
    font-size: 20px;
    padding-left: 10px;
    font-weight: bold;
    box-sizing: border-box;
`

export const Times = styled.div`
    height: 100%;
    width: 40%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const Time = styled.div`
    width: 100%;
    height: 40%;

    display: flex;
    align-content: center;
    justify-content: flex-end;
    font-size: 9px;
`

export const WhiteTime = styled.div`
    height: 100%;
    width: 50%;
    margin-right: 3px;
    background-color: lightgray;
`

export const BlackTime = styled.div`
    height: 100%;
    width: 50%;
    margin-right: 3px;
    background-color: black;
`