export type Tactivity = {
    id: string,
    date: Date | null | undefined,
    name: string,
    hoursRange: { start: Date | null | undefined, end: Date | null | undefined },
    classOrWorkshop: string,
    teacher: string,
    location: string,
    isCanceled: boolean,
    reasonOfCancelation: string
    practitioners: Tpractitioner[] | undefined,
}
export type Tpractitioner = {
    email: string;
    name: string;
    hasArrived?: boolean;
}

export type TperiodicAgenda = {
    _id?: string
    date?: { start: string, end: string } | undefined,
    activities?: Tactivity[] | undefined,
}


export type TuserMsgProps = {
    isSucsses: boolean
    msg: string
}
export type TuserQuestionnaire = {
    firstName: string,
    lastName: string,
    israelid: string,
    gender: string,
    dayBirth: string,
    monthBirth: string,
    yearBirth: string,
    occupation: string,
    address: string,
    phone: string,
    comments: string,
}
export type Tplan = {
    _id?: string,
    type: string,
    price: number,
    desc: string,
    constraints: string[],
}
type Tsubscription = {
    type: string
    entries: Number
}

export type Tmembership =
    {
        _id?: string,
        dropIn?: boolean,
        userId: string,
        subscription: Tsubscription,
        start?: Date,
        end?: Date,
        isExpired: boolean,
        paid: number,
        dateOfPurchase: Date,
    }

