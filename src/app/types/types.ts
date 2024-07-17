export type Tactivity = {
    date:string ,
    name:string,
    hoursRange:{start:string,end:string},
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


