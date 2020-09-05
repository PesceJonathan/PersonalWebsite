import React from "react";
import styled from "styled-components";
import truck from "../Assets/Truck.png";

export function Truck() {    
    return (
        <Container>
            <TruckImg src={truck}/>
            <Road/>
            <RoadLine1/>
            <RoadLine2/>
            <RoadLine3/>
            <RoadLine4/>
            <RoadLine5/>
            <RoadLine6/>
            <RoadLine7/>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;

    position: relative;
    width: 200px;
    height: 150px;
    overflow: hidden;

    @media (max-width: 1024px) {
        height: 100px;
        margin: 20px 0px;
    }
`

const TruckImg = styled.img`
    position: relative;
    height: 125px;
    width: 125px;
    z-index: 3;

    animation: animate-plane 1.6s linear infinite;

    @keyframes animate-plane {
        0% {
            transform: translate(1px, 1px);
        }

        50% {
            transform: translate(-1px, -1px);
        }

        100% {
            transform: translate(1px, 1px);
        }
    }
`

const Road = styled.div`
    position: absolute;
    height: 50px;
    width: 200px;

    background-color: black;
    border-top: 2px solid gray;
    border-bottom: 2px solid gray;
    z-index: 1;
`

const RoadLine = styled.div`
    position: absolute;
    top: 115px;
    z-index: 2;
    width: 20px;
    height: 10px;
    background-color: yellow;

    @media (max-width: 1024px) {
        top: 70px;
    }

    animation: animate-road 3s linear infinite;

    @keyframes animate-road {
        0% {
            transform: translateX(0px);
        }

        100% {
            transform: translateX(-180px);
        }
    }
`

const RoadLine1 = styled(RoadLine)`
    left: 0px;
`
const RoadLine2 = styled(RoadLine)`
    left: 60px;
`
const RoadLine3 = styled(RoadLine)`
    left: 120px;
`
const RoadLine4 = styled(RoadLine)`
    left: 180px;
`
const RoadLine5 = styled(RoadLine)`
    left: 240px;
`
const RoadLine6 = styled(RoadLine)`
    left: 300px;
`
const RoadLine7 = styled(RoadLine)`
    left: 360px;
`