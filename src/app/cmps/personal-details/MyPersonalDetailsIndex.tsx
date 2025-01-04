"use client"
import { Tactivity, Tmembership, Tuser } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import MyUserQuestionaireCard from './MyUserQuestionaireCard'
import MyUserHealthDecelrationCard from './MyUserHealthDecelrationCard'
import { AlertBox } from '../AlertBox'
import { useDispatch } from 'react-redux'
import { callUserMsg, hideUserMsg } from '@/app/store/features/msgSlice'
import { getFullUserByEmail } from '@/app/utils/util'
import MyActivitiesIndex from './MyActivitiesIndex'
import MyMembershipsIndex from './MyMembershipsIndex'
import MyWorkshopsIndex from './MyWorkshopsIndex'
import { removePractitionerFromActivityFromDatabase } from '@/app/actions/periodicAgendaActions'
import { refundPractitionerMembershipAtDatabase } from '@/app/actions/membershipActions'
import { updateUserWithNewMembershipAtDatabase } from '@/app/actions/userActions'

type MyPersonalDetailsIndexProps = {
    userName: string
    userEmail: string
    userId: string
    myActivities: Tactivity[]
    periodicAgendaId: string
    memberships: Tmembership[]
    myWorkshopsTickets: Tmembership[]
    userQuestionnaireId: string
    userHealthDeclarationLink: string
}

export default function MyPersonalDetailsIndex(props: MyPersonalDetailsIndexProps) {

    const [myActivities, setMyActivities] = useState<Tactivity[]>()
    const [myMemberships, setMyMemberships] = useState<Tmembership[]>()
    const [isAlertBoxShown, setIsAlertBoxShown] = useState(false)
    const [currActivityId, setCurrActivityId] = useState('')
    const [currActivityName, setCurrActivityName] = useState('')
    const [userMsg, setUserMsg] = useState('')
    const [btnTxt, setBtnTxt] = useState('')
    const [currMembershipId, setCurrMembershipId] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('userQuestionnaireId', props.userQuestionnaireId);

        setMyActivities(props?.myActivities?.reverse())
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

    const askUserIfToRemoveHimFromActivity = (membershipId: string, activityName: string) => {
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
            let txt = `${props.userName} הוסר משיעור ${currActivityName} בהצלחה`
            getUserMsg(txt, true)

        } else {
            let txt = `הייתה בעייה לבטל שיעור, נסה מאוחר יותר`
            getUserMsg(txt, false)

        }
        const membershipAfterRefund = await refundPractitionerMembershipAtDatabase(currMembershipId)
        if (membershipAfterRefund) {
            console.log('practitioner after refund', membershipAfterRefund);
            refundPractitionerMembershipClientSide(membershipAfterRefund)

            setIsLoading(false)
        }
        const user: Tuser = await getFullUserByEmail(props.userEmail)
        // here we check if after refund user stil have memebershipId under user.memberships?
        const doUserOwnMembership = user.memberships.some(membership => membership === currMembershipId)
        //if yes do nothing if no add it back to user.memberships[]
        console.log('do User Own Membership', doUserOwnMembership);
        if (!doUserOwnMembership) {
            const wasMembershipJustPurchesed = false
            const [isSucsses, updatedUser] = await updateUserWithNewMembershipAtDatabase(currMembershipId, user._id, wasMembershipJustPurchesed)
            if (isSucsses) {
                console.log('user.memberships was updated whith the refunded membership?', updatedUser);
            }
        }
        removeActivityFromClientSide(currActivityId)
    }

    const refundPractitionerMembershipClientSide = (membershipAfterRefund: Tmembership) => {
        //is memebrship there? if yes 1.find it 2.replace it with the updated one.
        // if no - push it to client side array of memberships
        const isMembershipFound = myMemberships?.some(membership => membership._id === currMembershipId)
        if (isMembershipFound) {
            const index = myMemberships.findIndex(membership => membership._id === currMembershipId)
            myMemberships.splice(index, 1, membershipAfterRefund)
            setMyMemberships([...myMemberships])
        }
        else {
            if (!myMemberships) {
                setMyMemberships([membershipAfterRefund])
                setIsLoading(false)
                return
            }
            myMemberships.unshift(membershipAfterRefund)
            setMyMemberships([...myMemberships])
        }
    }

    const removeActivityFromClientSide = (currActivityId: string) => {
        let index = myActivities.findIndex(activity => activity.id === currActivityId)
        myActivities.splice(index, 1)
        let updatedActivities = [...myActivities]
        setMyActivities(updatedActivities)

    }
    let alertBoxProps = {
        isAlertBoxShown, setIsAlertBoxShown,
        userMsg, setUserMsg,
        btnTxt, setBtnTxt,
        currMembershipId,
        removePractitionerFromActivity,
        userId: props.userId,

    }

    let MyActivitiesIndexProps = {
        myActivities,
        periodicAgendaId: props.periodicAgendaId,
        userEmail: props.userEmail,
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

            <MyActivitiesIndex {...MyActivitiesIndexProps} />

            <section className='my-memberships-container card'>
                <h3 className='tac mb-05'>מנויים</h3>
                <MyMembershipsIndex memberships={myMemberships} />
                {props.myWorkshopsTickets &&
                    <section className='my-memberships-container mt-1'>
                        <h3 className='tac mb-05'> הסדנאות שלי</h3>
                        <MyWorkshopsIndex myWorkshopsTickets={props.myWorkshopsTickets} />
                    </section>}
            </section>

            <section className='my-user-questionneaire card '>
                <h3 className='tac mb-05'>שאלון אישי</h3>
                <MyUserQuestionaireCard
                    userQuestionnaireId={props.userQuestionnaireId && 'U' + props.userQuestionnaireId}
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