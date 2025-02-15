export type Tactivity = {
    _id?:string
    id?: string,
    date: Date | null | undefined,
    name?: string,
    hoursRange: { start: Date | null | undefined, end: Date | null | undefined },
    classOrWorkshop: string,
    workshop?: Tworkshop
    workshopId?:string
    teacher: string,
    location: string,
    isCanceled: boolean,
    practitioners: Tpractitioner[] | undefined,
}

export type Tpractitioner = {
    id?: string,
    email?: string,
    name?: string,
    membershipId: string
}
export type Tworkshop = {
    _id?: string
    activityId?: string
    id: string,
    title: string,
    subTitle: string,
    img?: string,
    imgUrl?:string,
    desc: string,
    activityStartTime:Date,
    activityEndTime:Date,
    lastDateForRegistration ?:Date,
    date:Date|null
    price:number|string
    activityLocation:string
}

export type TperiodicAgenda = {
    _id?: string
    date?: { start: string|Date, end: string|Date } | undefined,
    activities?: Tactivity[] | undefined,
}


export type TuserMsgProps = {
    isSuccess: boolean
    msg: string
}
export type TuserQuestionnaire = {
    _id?:string
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
    workshopTitle?:string
    entries: number
}

export type Tmembership =
    {
        _id?: string,
        userId: string,
        subscription: Tsubscription,
        start?: Date,
        end?: Date,
        isExpired: boolean,
        paid: number,
        dateOfPurchase: Date,
    }
export type Tuser =
    {
        _id?: string,
        name: string,
        email: string,
        password?: string,
        isNewUser?:boolean,
        healthDeclaration?: string,
        userQuestionnaireId?: string,
        memberships?: string[],
        worshopTickets?: string[],
        isAdmin: boolean,
    }

export type Tannouncement =
    {
       
        id?: string
        title: string,
        subTitle: string,
        date: Date | null | undefined,
        hours?: { start: Date, end: Date },
        img: string,
        desc: string,
        price?: number,
        workshopId?:string
    }
export type TselectedHoursRange = {
    start: Date
    end: Date
}
export type Tbillboard = {
    _id?: string
    announcements: Tannouncement[]
}

export type AgendaDates = {
    start: Date|string;
    end: Date|string;
};

export type FetchOptions = {
    method?: string;
    headers?: HeadersInit;
    body?: any;
    cache?: RequestCache;
  }