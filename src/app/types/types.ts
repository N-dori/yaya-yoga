export type Tactivity = {
    id: string,
    date: Date | null | undefined,
    name: string,
    hoursRange: { start: Date | null | undefined, end: Date | null | undefined },
    classOrWorkshop: string,
    teacher: string,
    location: string,
    isCanceled: boolean,
    reasonOfCancelation:string
    practitioners: string[],
}


export type TperiodicAgenda = {
    _id?: string
    date?: { start: string, end: string } | undefined,
    activities?: Tactivity[] | undefined
}


export type TuserMsgProps = {
    isSucsses: boolean
    msg: string
}