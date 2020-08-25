import React from "react";
import styled from "styled-components";
import { Parallax } from 'react-parallax';

export function JonathanPesce() {

    return (
        <div>
            <Parallax blur={10} bgImage={'https://raw.githubusercontent.com/PesceJonathan/PersonalWebsite/ChessPage/Assets/JonathanBackground.png'} bgImageAlt="the cat" strength={200}>
                <div style={{ height: '200px' }} />
            </Parallax>
        </div>
    )
}