interface DonutGraphData {
    title: string,
    result: number,
    colour: string,
}

interface BarGraphData {
    domain: string,
    value: number,
    color: string,
    date?: string
}

interface GameModeStats {
    header: string,
    rating: BarGraphData[],
    record: DonutGraphData[]
}

interface ChessUserInformation {
    avatar: string | undefined,
    profileLink: string,
    username: string,
    lastOnline: string,
    status: string,
    followers: number,
    joined: string,
    location: string,
    name: string
}

interface ChessInformation {
    userInfo: ChessUserInformation,
    stats: GameModeStats[],
    games: any
}