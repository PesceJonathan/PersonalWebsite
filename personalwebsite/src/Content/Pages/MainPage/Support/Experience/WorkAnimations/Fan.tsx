import React from "react";
import styled from "styled-components";

export function Fan() {
    return (
        <FanBox>
            <FanCircle>
                <FanContainer>
                    <LeftFan/>
                    <RightFan/>
                    <TopFan/>
                    <BottomFan/>
                </FanContainer>
            </FanCircle>
        </FanBox>
    );
}

const FanCircle = styled.div`
    height: 65px;
    width: 65px;

    align-items: center;
    background-color: #1d3557;
    border: 2px black solid;
    border-radius: 50%;
    display: flex;
    justify-content: center;
`

const FanBox = styled.div`
    height: 100px;
    width: 100px;

    align-items: center;
    background-color: #b2b2b2;
    border: 2px black solid;
    border-radius: 10px;
    display: flex;
    justify-content: center;

    margin: 25px 50px;
    @media (max-width: 1024px) {
        margin: 25px 0px;
    }
`

const FanContainer = styled.div`
    height: 60px;
    width: 60px;
    border-radius: 50%;
    position: relative;
    display: inline-block;
    animation: spin 1s linear infinite;

    @keyframes spin{
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }

    &:after{
        content:"";
        position: absolute;
        left: 50%;
        top: 50%;
        border-radius: 50%;
        width: 14px;
        height: 14px;
        margin-left: -7px;
        margin-top: -7px;
        background: #444;
        box-shadow: inset 0 0px 0px 2px #444444, inset 0 0px 1px 4px #383838;
    }
`

const FanElement = styled.div`
    display: block;
    background: #ccc;
    border-radius: 5px;
    position: absolute;
    box-shadow: inset 1px 1px 40px #555;
    &:after{
        content: "";
        position: absolute;
        background: #666;
        display: block;
    }
`

const HorizontalFan = styled(FanElement)`
    width: auto;
    height: 10px;
    top: 50%;
    margin-top: -5px;
    transform: skewX(20deg);
    &:after{
      top: 25%;
      width: 3px;
      height: 50%;
    }
`

const VerticalFan = styled(FanElement)`
    width: 10px;
    height: auto;
    left: 50%;
    margin-left: -5px;
    transform: skewY(20deg);
    &:after{
      height: 3px;
      width: 50%;
      margin-left: 25%;
    }
`

const LeftFan = styled(HorizontalFan)`
    left: 0;
    right: 50%;
    margin-right: 9px;
    border-radius: 50% 3px 3px 50%;
    &:after{
      left: 100%;
    }
`

const RightFan = styled(HorizontalFan)`
    right: 0;
    left: 50%;
    margin-left: 9px;
    border-radius: 3px 50% 50% 3px;
    &:after{
      right: 100%;
    }
`

const TopFan = styled(VerticalFan)`
    top: 0;
    bottom: 50%;
    margin-bottom: 9px;
    border-radius: 50% 50% 3px 3px;
    &:after{
      top: 100%;
    }
`

const BottomFan = styled(VerticalFan)`
    top: 50%;
    bottom: 0;
    margin-top: 9px;
     border-radius: 3px 3px 50% 50%;
    &:after{
      bottom: 100%;
    }
`