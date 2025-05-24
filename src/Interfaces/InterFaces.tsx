
export interface UserInterFace {
    name: string
    email: string
    role: string
    status: string
    id: string
}

export interface ConcertInterface {
    title: string
    id: string
    locationName: string
    startDate: string
    price: number
    totalTicket: number
    photos: string[]
}

export interface ComplainInterface {
    complainPhotos: string[]
    ticketId: string
    user: {
        name: string
        email: string
    }
    title: string
    id: string
    status : string
}