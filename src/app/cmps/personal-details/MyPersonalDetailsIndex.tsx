"use client"
import { Tactivity, Tmembership, Tpractitioner, Tuser } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import MyActivitiesList from './MyActivitiesList'
import MyMembershipsList from './MyMembershipsList'
import MyUserQuestionaireCard from './MyUserQuestionaireCard'
import Link from 'next/link'
import MyUserHealthDecelrationCard from './MyUserHealthDecelrationCard'
import { AlertBox } from '../AlertBox'
import { useDispatch } from 'react-redux'
import { callUserMsg, hideUserMsg } from '@/app/store/features/msgSlice'
import { getFullUserByEmail, refundPractitionerMembershipAtDatabase, removePractitionerFromActivityFromDatabase, updateUserWithNewMembershipAtDatabase } from '@/app/utils/util'

type MyPersonalDetailsIndexProps = {
    userName: string
    userEmail: string
    userId: string
    myActivities: Tactivity[]
    periodicAgendaId: string
    memberships: Tmembership[]
    userQuestionnaireId: string
    userHealthDeclarationLink: string
}

export default function MyPersonalDetailsIndex(props: MyPersonalDetailsIndexProps) {

    const [myActivities, setMyActivities] = useState<Tactivity[]>()
    const [myMemberships, setMyMemberships] = useState<Tmembership[]>()
    const [isAlertBoxShown, setIsAlertBoxShown] = useState(false)
    const [isActivityHasPassed, setIsActivityHasPassed] = useState(false)
    const [currActivityId, setCurrActivityId] = useState('')
    const [currActivityName, setCurrActivityName] = useState('')
    const [userMsg, setUserMsg] = useState('')
    const [btnTxt, setBtnTxt] = useState('')
    const [currMembershipId, setCurrMembershipId] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setMyActivities(props.myActivities)
        setMyMemberships(props.memberships)
    }, [])
    useEffect(() => {

    }, [myActivities?.length])

    const getAlertBox = (userMsg: string, btnTxt: string,) => {
        setUserMsg(userMsg)
        setBtnTxt(btnTxt)
        setIsAlertBoxShown(true)

    }
    
    const getUserMsg = (txt: string, isSucsses: boolean) => {
        window.scrollTo(0, 0)
        dispatch(callUserMsg({ msg: txt, isSucsses }))
        setTimeout(() => {
            dispatch(hideUserMsg())
        }, 3500);
    }

    const askUserIfToRemoveHimFromActivity = (membershipId: string, activityName:string) => {
        console.log('ask User If To Remove Him From Activity',);
        console.log('membershipId', membershipId);
        setCurrMembershipId(membershipId)
        setCurrActivityName(activityName)
        let nameOfUser = props.userName
        let msg = `היי ${nameOfUser ? nameOfUser : ""} האם ברצונך לבטל את הגעתך לשיעור ${activityName} ?`
        let btnTxt = 'כן בטוח ברצוני לבטל'
        getAlertBox(msg, btnTxt)
    }

    const removePractitionerFromActivity = async () => {
            setIsLoading(true)

            const wasRemoved = await removePractitionerFromActivityFromDatabase(props.periodicAgendaId, currActivityId, props.userEmail)
            if (wasRemoved) {
                // removePractitionerFromClientSideActivities(userEmail ,activity.id)
                let txt = `${props.userName} הוסר משיעור ${currActivityName} בהצלחה`
                getUserMsg(txt, true)

            } else {
                let txt = `הייתה בעייה לבטל שיעור, נסה מאוחר יותר`
                getUserMsg(txt, false)

            }
            const membershipAfterRefund = await refundPractitionerMembershipAtDatabase(currMembershipId)
            if (membershipAfterRefund) {
                console.log('practitioner after refund', membershipAfterRefund);
                //is memebrship there? if yes 1.find it 2.replace it with the updated one.
                // if no - push it to client side array of emberships
                const isMembershipFound = myMemberships.some(membership=>membership._id=== currMembershipId)
                if(isMembershipFound){
                   const index =  myMemberships.findIndex(membership=>membership._id=== currMembershipId)
                    myMemberships.splice(index,1,membershipAfterRefund)
                    setMyMemberships([...myMemberships])
                } 
                else {
                    myMemberships.unshift(membershipAfterRefund)
                    setMyMemberships([...myMemberships])
                }
                setIsLoading(false)
            }
            const user: Tuser = await getFullUserByEmail(props.userEmail)
            // here we check if after refund user stil have memebershipId under user.memberships?
            const doUserOwnMembership = user.memberships.some(membership => membership === currMembershipId)
            //if yes do nothing if no add it back to user.memberships[]
            console.log('do User Own Membership', doUserOwnMembership);
            if (!doUserOwnMembership) {
                const wasMembershipJustPurchesed =false
                const [isSucsses,updatedUser]= await updateUserWithNewMembershipAtDatabase(currMembershipId, user._id, wasMembershipJustPurchesed)
                if (isSucsses){
                    console.log('user.memberships was updated whith the refunded membership?', updatedUser);
                }    
            }  
            removeActivityFromClientSide(currActivityId) 
    }
    const removeActivityFromClientSide =(currActivityId:string) => {
        let index= myActivities.findIndex(activity=> activity.id === currActivityId)
        myActivities.splice(index,1)
        let updatedActivities =  [...myActivities]
        setMyActivities(updatedActivities)

    }
    let alertBoxProps = {
        isAlertBoxShown, setIsAlertBoxShown,
        userMsg, setUserMsg,
        btnTxt, setBtnTxt,
        currMembershipId,
        removePractitionerFromActivity,
        userId:props.userId,

    }

    let MyActivitiesListProps = {
        myActivities,
        periodicAgendaId:props.periodicAgendaId,
        userEmail:props.userEmail,
        setCurrActivityId,
        askUserIfToRemoveHimFromActivity,
        isLoading,
        currActivityId
    }

    return (
        <section className='personal-details-warpper flex-col'>

            <div className='greeting-conatiner '>
                <p className='mb-05'>היי {props.userName}, </p>
                <span>כיף לראות אותך! </span>
            </div>

            <section className='my-activities-container card'>
                <h3 className='tac mb-05'> השיעורים שלי</h3>
                    <MyActivitiesList {...MyActivitiesListProps}  />
              
            </section>

            <section className='my-memberships-container card'>
                <h3 className='tac mb-05'>מנויים</h3>
                <div className='is-membership-excist-txt'>
                    {myMemberships?.length === 0 && <div className='tac mb-05 flex-col gap05'><p> לא קיים מנוי פעיל</p><Link href={'/pricing'}>לרכישת מנוי חדש</Link></div>}
                    {myMemberships?.length === 1 && <p className='tac mb-05'> קיים מנוי פעיל 1</p>}
                    {myMemberships?.length > 1 && <p className='tac mb-05'>קיימים {myMemberships?.length} מנויים פעילים</p>}

                </div>
                <MyMembershipsList memberships={myMemberships} />

            </section>

            <section className='my-user-questionneaire card '>
                <h3 className='tac mb-05'>שאלון אישי</h3>
                <MyUserQuestionaireCard
                    userQuestionnaireId={props.userQuestionnaireId ? 'U' + props.userQuestionnaireId : undefined}
                    userId={props.userId} />

            </section>

            <section className='my-health-decelration card'>
                <h3 className='tac mb-05'>הצהרת בריאות</h3>
                <MyUserHealthDecelrationCard
                    userHealthDeclarationLink={props.userHealthDeclarationLink}
                    userId={props.userId} />

            </section>

            <AlertBox {...alertBoxProps} />
        </section>

    )
}