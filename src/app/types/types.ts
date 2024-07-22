export type Tactivity = {
    id:string,
    date:Date | null | undefined ,
    name:string,
    hoursRange:{start:Date,end:Date},
    classOrWorkshop:string,
    teacher:string,
    location:string,
    practitioners:[ ],
    }


export type TperiodicAgenda=  {
    _id?:string
    date:{start:string, end:string },
    activities:Tactivity[]
    }  


