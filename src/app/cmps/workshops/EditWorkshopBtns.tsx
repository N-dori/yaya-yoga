import React from 'react'
import Spinner from '../Spinner'

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
        <section className='flex-sb gap05 mb-1'>
            <button type='button' className='btn flex-jc-ac' onClick={()=>setIsEditMode(true)}>{isEditMode?
            <span  onClick={onSaveChanges}> {isLoading?<Spinner/>:'שמירת שינויים'} </span>:'עריכת סדנא'}</button>
            <button type='button' onClick={onRemoveWorkshop} className='btn flex-jc-ac'>מחיקת סדנא</button>

        </section>
         )
}