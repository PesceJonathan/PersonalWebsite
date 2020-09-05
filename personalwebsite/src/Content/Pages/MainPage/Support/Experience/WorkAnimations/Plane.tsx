import React from "react";
import styled from "styled-components";
import airplane from "../Assets/Plane.png";
import cloud from "../Assets/cloud.svg";

export function Plane() {    
    return (
        <Container>
            <PlaneContainer>
                <PlaneImage src={airplane}/>
            </PlaneContainer>
            <Clouds>
                <CloudImage src={cloud}/>
                <CloudImage src={cloud}/>
                <CloudImage src={cloud}/>
            </Clouds>
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    width: 200px;
    height: 150px;
    overflow: hidden;
`

const PlaneContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0; 
    display: flex;
    justify-content: center;
    align-items: center;
    animation: animate-plane 1.6s linear infinite;

    @keyframes animate-plane {
        0% {
            transform: translate(4px, 4px);
        }

        50% {
            transform: translate(-4px, -4px);
        }

        100% {
            transform: translate(4px, 4px);
        }
    }
`

const PlaneImage = styled.img`
    height: 150px;
    width: 150px;
    position: relative;
    z-index: 3;
`

const Clouds = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    > img:nth-child(1) {
        top: 15px;
        animation-delay: -2s;
        animation: animate-cloud 8s linear infinite;
    }

    > img:nth-child(2) {
        top: -10px;
        animation-delay: -4s;
        animation: animate-cloud 6s linear infinite;
    }

    > img:nth-child(3) {
        top: 40px;
        animation-delay: -5s;
        animation: animate-cloud 5s linear infinite;
    }

    @keyframes animate-cloud {
        0% {
            transform: translateX(400px);
        }

        40% {
            transform: translateX(-400px);
        }

        100% {
            transform: translateX(-400px);
        }
    }
`

const CloudImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.8;
    animation: animate-cloud 4s linear infinite;
    z-index: 2;

    @keyframes animate-cloud {
        0% {
            transform: translateX(400px);
        }

        40% {
            transform: translateX(-400px);
        }

        100% {
            transform: translateX(-400px);
        }
    }
`