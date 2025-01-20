import React from 'react'
import Spinner from '../Spinner'
import TrashSvg from '@/app/assets/svgs/TrashSvg'
import { PencilSvg } from '@/app/assets/svgs/PencilSvg'
import SaveSvg from '@/app/assets/svgs/SaveSvg'

type EditWorkshopBtnsProps = {
    isAdmin:boolean
    isOnDetailsPage:boolean
    setIsEditMode:(editMode:boolean) => void
    isEditMode:boolean
    isLoading:boolean
    onSaveChanges:()=>void
    onRemoveWorkshop:()=>void
    
}

export default function EditWorkshopBtns({isAdmin, isOnDetailsPage,setIsEditMode,onRemoveWorkshop, isEditMode,onSaveChanges,
    isLoading}: EditWorkshopBtnsProps) {
  return (
    
        (isAdmin)&&
        <section className='flex gap1 mb-1'>
            <section className='flex-jc-ac' onClick={()=>setIsEditMode(true)}>
        {isEditMode?
            <p title='שמירת שינויים' className='pointer' onClick={onSaveChanges}> 
            {isLoading?<Spinner/>:<SaveSvg/>} </p>
                :
            <p title='עריכה' className='pointer'><PencilSvg/></p>}
            </section>

            <p title='מחיקת סדנא' onClick={onRemoveWorkshop} className='pointer'><TrashSvg/></p>

        </section>
         )
}