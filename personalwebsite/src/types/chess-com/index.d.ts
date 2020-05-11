//Types that are going to be used to define Chess.com API results
export interface IGame {
    url: string, 
    pgn: string,
    time_control: string, 
    end_time: number,
    rated: boolean,
    fen: string,
    time_class: string,
    rules: string,
    white: IPlayerInformation,
    black: IPlayerInformation
}

export interface IPlayerInformation {
    rating: number, 
    result: string,
    "@id": string,
    username: string
}