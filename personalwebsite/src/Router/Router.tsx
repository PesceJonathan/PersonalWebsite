import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ChessPage } from "../Content/Pages/Chess/ChessPage";
import { WorldMap } from "../Content/Pages/WorldMap/WorldMap";
import { JonathanPesce } from "../Content/Pages/MainPage/JonathanPesce";


export function RouterManager() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={"/chess"} render={() => <ChessPage username={"PesceTheFish"}/>}/>
                <Route exact path={"/worldMap"} component={WorldMap}/>
                <Route exact path={"/"} component={JonathanPesce}/>
            </Switch>
        </BrowserRouter>
    )
}