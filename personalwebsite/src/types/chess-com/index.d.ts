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

export interface GamesResponse {
    games: IGame[],
}

export interface IPlayerInformation {
    rating: number, 
    result: string,
    "@id": string,
    username: string
}

export interface UserInfoResponse {
    "@id": string,
    url: string,
    username: string,
    player_id: string,
    title: string,
    status: string,
    name: string,
    avatar: string,
    location: string,
    country: string,
    joined: number,
    last_online: number,
    followers: number,
    is_streamer: boolean,
    twitch_url: string,
    fide: string
}

export interface PlayerStatsResponse {
    chess_daily: ChessDailyStats,
    chess960_daily: ChessDailyStats,
    chess_rapid: ChessStats,
    chess_bullet: ChessStats,
    chess_blitz: ChessStats,
    fide: number,
    tactics: MilestoneResults,
    lessons: MilestoneResults,
    puzzle_rush: PuzzleRush,
}

export interface PuzzleRush {
    total_attempts: number,
    score: number
}

export interface MilestoneResults {
    highest: Rating,
    lowest: Rating
}

export interface ChessStats {
    last: LastResult,
    best: BestResult,
    record: ChessRecord
}

export interface ChessDailyStats extends ChessStats {
    tournament: ChessDailyTournamentRecord,
}

export interface ChessDailyTournamentRecord {
    points: number,
    withdraw: number,
    count: number,
    highest_finish: number
}

export interface ChessDailyRecord extends ChessRecord{
    time_per_move: number,
    timeout_percent: number
}

export interface ChessRecord {
    win: number,
    loss: number,
    draw: number
}

export interface Rating {
    rating: number,
    date: number, 
}

export interface LastResult extends Rating {
    rd: number
}

export interface BestResult extends Rating{
    game: string
}