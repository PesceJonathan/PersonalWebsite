import { IGame, GamesResponse } from "../types/chess-com";

export class RetrieveGames {
    private archivesURL: string[]; 
    private games: IGame[];
    private archiveCounter: number;
    private gameCounter: number;
    private game: Promise<IGame>;

    constructor(archivesURL: string[]) {
        this.archivesURL = archivesURL;
        this.archiveCounter = archivesURL.length - 1;
        this.games = [];
        this.gameCounter = -1;

        this.game = this.fetchListOfGames();
    }

    public getFirstGame(): Promise<IGame> {
        return this.game;
    }

    public retrieveNextGame(): IGame {
        let {games, gameCounter} = this;

        if (games.length === 0)
            return backupGame;

        let game: IGame = games[gameCounter];
        this.gameCounter -= 1;
        
        if (gameCounter < 0)
            this.fetchListOfGames();
        
        return game;
    }

    private fetchListOfGames() {
        let {archiveCounter, archivesURL} = this;

        if (archiveCounter < 0)
            archiveCounter = archivesURL.length - 1;

        return new Promise<IGame>((resolve, reject) => {
            fetch(archivesURL[archiveCounter--])
            .then((response: Response) => response.json())
            .then((data: GamesResponse) => {
                this.games = data.games;
                this.gameCounter = this.games.length - 1;
                resolve(this.retrieveNextGame());
            })
        });
    }
}

//Temp data for now (To change to MC game or Alpha Zero)
const backupGame: IGame = {
    "url":"https://www.chess.com/live/game/4795799891",
    "pgn":"[Event \"Live Chess\"]\n[Site \"Chess.com\"]\n[Date \"2020.05.01\"]\n[Round \"-\"]\n[White \"aleeminn\"]\n[Black \"PesceTheFish\"]\n[Result \"0-1\"]\n[ECO \"C44\"]\n[ECOUrl \"https://www.chess.com/openings/Kings-Pawn-Opening-Tayler-Opening\"]\n[CurrentPosition \"2r3kr/p4p1p/1b4pB/3p4/1R6/N1P2Q2/PP3PPP/4q1K1 w - -\"]\n[Timezone \"UTC\"]\n[UTCDate \"2020.05.01\"]\n[UTCTime \"10:54:30\"]\n[WhiteElo \"1024\"]\n[BlackElo \"1106\"]\n[TimeControl \"180+2\"]\n[Termination \"PesceTheFish won by checkmate\"]\n[StartTime \"10:54:30\"]\n[EndDate \"2020.05.01\"]\n[EndTime \"11:02:02\"]\n[Link \"https://www.chess.com/live/game/4795799891\"]\n\n1. e4 {[%clk 0:03:01.5]} 1... e5 {[%clk 0:03:00.7]} 2. Nf3 {[%clk 0:03:01.4]} 2... Nc6 {[%clk 0:03:00.7]} 3. Be2 {[%clk 0:03:01.6]} 3... Bb4 {[%clk 0:03:00.7]} 4. c3 {[%clk 0:02:59.4]} 4... Ba5 {[%clk 0:03:00.9]} 5. O-O {[%clk 0:03:00.7]} 5... Nf6 {[%clk 0:03:01]} 6. d3 {[%clk 0:03:00]} 6... Nh5 {[%clk 0:03:00.6]} 7. Nxe5 {[%clk 0:02:57.3]} 7... Nxe5 {[%clk 0:02:55.7]} 8. Bxh5 {[%clk 0:02:56.3]} 8... g6 {[%clk 0:02:56.6]} 9. Be2 {[%clk 0:02:54.1]} 9... d6 {[%clk 0:02:51.4]} 10. d4 {[%clk 0:02:54.5]} 10... Nd7 {[%clk 0:02:46.8]} 11. e5 {[%clk 0:02:53.4]} 11... dxe5 {[%clk 0:02:45.4]} 12. dxe5 {[%clk 0:02:54.4]} 12... Nxe5 {[%clk 0:02:41.2]} 13. Qa4+ {[%clk 0:02:50.5]} 13... Nc6 {[%clk 0:02:38.3]} 14. Bb5 {[%clk 0:02:47.7]} 14... Bb6 {[%clk 0:02:20.1]} 15. Re1+ {[%clk 0:02:45.6]} 15... Kf8 {[%clk 0:01:54.3]} 16. Bh6+ {[%clk 0:02:43.7]} 16... Kg8 {[%clk 0:01:47.7]} 17. Bxc6 {[%clk 0:02:40.7]} 17... bxc6 {[%clk 0:01:40.7]} 18. Qxc6 {[%clk 0:02:40.3]} 18... Bd7 {[%clk 0:01:39.4]} 19. Qf3 {[%clk 0:02:17.8]} 19... c6 {[%clk 0:01:03.4]} 20. Na3 {[%clk 0:02:11.5]} 20... Qh4 {[%clk 0:01:03.5]} 21. Bf4 {[%clk 0:01:43.8]} 21... Rc8 {[%clk 0:00:35.9]} 22. Rad1 {[%clk 0:01:38.4]} 22... Be6 {[%clk 0:00:34.9]} 23. Re4 {[%clk 0:01:03.2]} 23... Bd5 {[%clk 0:00:35.3]} 24. Rxd5 {[%clk 0:00:33.3]} 24... cxd5 {[%clk 0:00:33.9]} 25. Rb4 {[%clk 0:00:17.7]} 25... Qe7 {[%clk 0:00:20.4]} 26. Bh6 {[%clk 0:00:05.1]} 26... Qe1# {[%clk 0:00:20.8]} 0-1",
    "time_control":"180+2",
    "end_time":1588330922,
    "rated":true,
    "fen":"2r3kr/p4p1p/1b4pB/3p4/1R6/N1P2Q2/PP3PPP/4q1K1 w - -",
    "time_class":"blitz",
    rules:"chess",
    white:{
       "rating":1024,
       "result":"checkmated",
       "@id":"https://api.chess.com/pub/player/aleeminn",
       "username":"aleeminn"
    },
    black:{
       "rating":1106,
       "result":"win",
       "@id":"https://api.chess.com/pub/player/pescethefish",
       "username":"PesceTheFish"
    }
  }