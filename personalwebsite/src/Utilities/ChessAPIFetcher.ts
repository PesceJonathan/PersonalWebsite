import { UserInfoResponse, PlayerStatsResponse, ChessStats } from "../types/chess-com";
import { RetrieveGames } from "./RetrieveGames";

export const getChessData = (username: string): Promise<ChessInformation> => 
{
    return new Promise<ChessInformation>((resolve, reject) => {
        //For now we are going to do request sequentially so that there is no issue with Chess.com
        //Todo If possible test working with sending parrellel request and see what you can get away with
        let UserInformationPromise = fetch(`https://api.chess.com/pub/player/${username}`)
                                        .then((res: Response) => res.json());

        let UserStatsPromise = fetch(`https://api.chess.com/pub/player/${username}/stats`)
                                    .then((res: Response) => res.json()); 

        let onlineStatusPromise = fetch(`https://api.chess.com/pub/player/${username}/is-online`)
                                .then((res: Response) => res.json()); 

        let gameURLS = fetch(`https://api.chess.com/pub/player/pescethefish/games/archives`)
                        .then((res: Response) => res.json());
        

        Promise.all([UserInformationPromise, onlineStatusPromise, UserStatsPromise, gameURLS])
            .then((values: any[]) => {
                //Retrieves user information 
                let userInfoRes: UserInfoResponse = values[0];
                let online: boolean = values[1];
                let userInformation: ChessUserInformation = getUserInformation(userInfoRes, online);

                //Retrieves users stats
                let userStatsResponse: PlayerStatsResponse = values[2];
                let userStats: GameModeStats[] = getUserStats(userStatsResponse);

                //Retrieve the url of the user's games
                let usersGames: string[] = values[3].archives;
                let games = new RetrieveGames(usersGames);

                resolve({
                    userInfo: userInformation,
                    stats: userStats,
                    games: games,
                });
            })
    })
}

function getUserStats(res: PlayerStatsResponse): GameModeStats[] {
    return [
        getGameModeStats(res.chess_rapid, "Rapid"),
        getGameModeStats(res.chess_bullet, "Bullet"),
        getGameModeStats(res.chess_blitz, "Blitz"),
    ]
}

function getGameModeStats(data: ChessStats, title: string): GameModeStats {
    let {best, last, record} = data;
    let green = "#769656";
    let red = "#b33430";
    let gray = "#a7a6a2";

    if (!best)
        best = {
            game: "",
            rating: 1200,
            date: 0, 
        };
    

    let bestRating: BarGraphData = {
        domain: "Best",
        value: best.rating,
        date: getFormattedDate(best.date ?? 0),
        color: green
    }

    let currentRating: BarGraphData = {
        domain: "Current",
        value: last.rating,
        color: (best.rating === last.rating) ? green : red  
    }

    let gameRecord: DonutGraphData[] = [
        generateDonutGraphData("Loss", record.loss, red),
        generateDonutGraphData("Draws", record.draw, gray),
        generateDonutGraphData("Wins", record.win, green)
    ]

    return {
        header: title,
        rating: [bestRating, currentRating],
        record: gameRecord,
    }
}

function generateDonutGraphData(title: string, result: number, colour: string): DonutGraphData {
    return {
        title: title,
        result: result,
        colour: colour,
    }
}

function getUserInformation(res: UserInfoResponse, online: boolean): ChessUserInformation {
    let {avatar, url, name, last_online, status, followers, joined, location, username } = res;

    return {
        avatar: avatar,
        profileLink: url,
        username: username,
        lastOnline: online ? "Currently" : convertNumberToDate(last_online),
        status: capitalizeFirstLetter(status),
        followers: followers,
        joined: convertNumberToDate(joined),
        location: location,
        name: name
    }
}

function convertNumberToDate(time: number) : string{
    let date: Date = new Date(time * 1000);
    let month: string = months[date.getMonth()];
    let day: string = getFormattedDate(date.getDate());
    let year: number = date.getFullYear();

    return `${month} ${day} ${year}`;
}

function getFormattedDate(day: number): string {
    let punctuation: string = "th";
    

    if (day === 1) {
        punctuation = "st";
    } else if (day === 2) {
        punctuation = "nd";
    } else if (day === 3) {
        punctuation = "rd";
    } 

    return day + punctuation;
}

function capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

//TODO needs to be what throws the user not found exception 
//TODO needs to handle different error codes i.e. res.ok()

//Define the constants for Dates
const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
