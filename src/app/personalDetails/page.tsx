import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/AuthOptions';
import { getServerSession } from 'next-auth';
import { getFullUserByEmail, getMembership, getPreiodicAgenda } from '../utils/util';
import { Tactivity, Tmembership, TperiodicAgenda, Tuser } from '../types/types';
import MyMembershipsList from '../cmps/personal-details/MyMembershipsList';
import Link from 'next/link';
import MyUserQuestionaireCard from '../cmps/personal-details/MyUserQuestionaireCard';
import MyUserHealthDecelrationCard from '../cmps/personal-details/MyUserHealthDecelrationCard';
import MyActivitiesList from '../cmps/personal-details/MyActivitiesList';
import MyPersonalDetailsIndex from '../cmps/personal-details/MyPersonalDetailsIndex';
type Props = {}

export default async function page({ }: Props) {
    const session = await getServerSession(authOptions)
    const user: Tuser = await getFullUserByEmail(session?.user?.email)

    const loadMemberships = async (): Promise<Tmembership[] | null> => {
        if (!user?.memberships || user?.memberships.length === 0) {
            return null;
        }
        // Use `map` to create an array of promises
        const membershipPromises = user.memberships.map((membershipId) =>
            getMembership(membershipId) // Returns a promise
        );

        // Await all promises and collect results
        const memberships = await Promise.all(membershipPromises);
        return memberships;
    };
    const res = await getPreiodicAgenda()
    let periodicAgenda: TperiodicAgenda

    if (res) {
        periodicAgenda = await res.periodicAgenda
    }
    const isBothTheSameDate = (date1: Date, date2: Date) => {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
    }
    const loadMyUpComingActivities = async (): Promise<Tactivity[] | null> => {
        // get the current date 
        const today = new Date()
        // loop thghout the last periodicAgenda.activities for each activity 
        let myUpComingActivities: Tactivity[]
        myUpComingActivities = periodicAgenda?.activities.filter((activity: Tactivity) => {
            const actitityDate = new Date(activity.date)

            if (actitityDate > today || isBothTheSameDate(actitityDate, today)) {
                return activity.practitioners.some(practitioner => practitioner.email === user.email)
            }
        })

        // return activity promise only if today is later than today 
        return myUpComingActivities?.length > 0 ? myUpComingActivities : null
    }
    const memberships: Tmembership[] | null = await loadMemberships();
    const myActivities: Tactivity[] | null = await loadMyUpComingActivities()

    const MyPersonalDetailsProps = {
        userName:session.user.name,
        userEmail:user.email,
        userId:user._id,
        myActivities,
        periodicAgendaId:periodicAgenda._id,
        memberships,
        userQuestionnaireId:user.userQuestionnaireId,
        userHealthDeclarationLink:user.healthDeclaration,
    }

    return (
        <section className='personal-details-container gc2'>
            <h2 className='tac m-0'>האיזור האישי </h2>
            <MyPersonalDetailsIndex {...MyPersonalDetailsProps}/>

        </section>
    )
}