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
    return (
        <section className='personal-details-container gc2'>
            <h2 className='tac m-0'>האיזור האישי </h2>
            <section className='personal-details-warpper flex-col'>

                <div className='greeting-conatiner '>
                    <p className='mb-05'>היי {session.user.name}, </p>
                    <span>כיף לראות אותך! </span>
                </div>

                <section className='my-activities-container card'>
                    <h3 className='tac mb-05'> השיעורים שלי</h3>
                    {myActivities ?
                        <MyActivitiesList myActivities={myActivities} periodicAgendaId={periodicAgenda._id} userEmail={user.email}/>
                        :
                        <p>אינך רשומ/ה </p>
                    }

                </section>
                <section className='my-memberships-container card'>
                    <h3 className='tac mb-05'>מנויים</h3>
                    <div className='is-membership-excist-txt'>
                        {user?.memberships.length === 0 && <div className='tac mb-05 flex-col gap05'><p> לא קיים מנוי פעיל</p><Link href={'/pricing'}>לרכישת מנוי חדש</Link></div>}
                        {user?.memberships.length === 1 && <p className='tac mb-05'> קיים מנוי פעיל 1</p>}
                        {user?.memberships.length > 1 && <p className='tac mb-05'>קיימים {memberships.length} מנויים פעילים</p>}

                    </div>
                    <MyMembershipsList memberships={memberships} />

                </section>

                <section className='my-user-questionneaire card '>
                    <h3 className='tac mb-05'>שאלון אישי</h3>
                    <MyUserQuestionaireCard
                        userQuestionnaireId={user.userQuestionnaireId ? 'U' + user.userQuestionnaireId : undefined}
                        userId={user._id} />

                </section>
                <section className='my-health-decelration card'>
                    <h3 className='tac mb-05'>הצהרת בריאות</h3>
                    <MyUserHealthDecelrationCard
                        userHealthDeclarationLink={user.healthDeclaration}
                        userId={user._id} />

                </section>


            </section>


        </section>
    )
}