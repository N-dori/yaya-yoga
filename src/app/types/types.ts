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
export type TuserQuestionnaire = {
    firstName:string,
    lastName:string,
    israelid:string,
    gender:string,
    dayBirth:string, 
    monthBirth:string,
    yearBirth:string,
    occupation:string,
    address:string,
    phone:string,
    comments:string,
}