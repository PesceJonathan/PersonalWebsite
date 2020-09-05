import React from "react";
import styled from "styled-components";
import waterBottle from "../Assets/waterBottle.png";

export function FilledUpAdnArt() {
    return (
        <Container>
            <BorderBox>
                <WaterBottle src={waterBottle}/>
            </BorderBox>
        </Container>
    );
}

const Container = styled.div`
    width: 200px;
    height: 150px;
`

const WaterBottle = styled.img`
    position: relative;
    height: 140px;
    width: 140px;
    z-index: 4;
`

const BorderBox = styled.div`
    width: 140px;
    height: 140px;
    color: #ddd;
    position: relative;
    overflow: hidden;
    margin-top: 10px;

    &:before {
        content: "";
        position: absolute;
        width: 200px;
        height: 200px;
        background: #00acee;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 40%;
        animation: fill 6s ease-in-out infinite;

        @keyframes fill {
           from {
               top: 150px;
               transform: translateX(-50%) rotate(0deg);
           } 

           to {
               top: 0px;
               transform: translateX(-50%) rotate(360deg);
           }
        }
    }
`