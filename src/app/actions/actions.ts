'use server'


export async function handelPeriodicAgendaForm(formData:FormData){
    console.log('formData',formData);

    let  newActivity = {
        date:{start:formData.get('date'), end:formData.get('date')},
        name:formData.get('name'),
        hoursRange:{start:'',end:''},
        classOrWorkshop:formData.get('activity-type'),
        teacher:formData.get('teacher'),
        location:formData.get('location'),
        practitioners:[ ],
    }
        console.log('newActivity',newActivity);
          
      
        }
      