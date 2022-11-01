import React, { useEffect, useState } from 'react'
import useGetData from '../Hooks/useGetData'
import Pending from './Pending'
import TopPanel from './TopPanel'
import UsersRanking from './UsersRanking'
import UserSteps from './UserSteps'
import SubmitForm from './SubmitForm'

function UserProfile({user}) {
  const [timeStamp, setTimeStamp] = useState(new Date());

  const {data: ranking, loading: rankingLoading, error: rankingError} =  useGetData(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/steps/ranking/`, timeStamp);
  const {data: userSteps, loading: stepsLoading, error: stepsError} =  useGetData(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/steps/steps/${user.id}`, timeStamp);

  return (
    <>
      <TopPanel activeUser={user} />

      <div id="formAnchor"></div>
      <section className='userProfile'>
        <div className='userProfile__name'>{user.name}</div>
        <div className='userProfile__avatar'>
          <img src={`avatars/${user.avatar}`} alt={user.name} />
        </div>
      </section>

      <SubmitForm user={user} setTimeStamp={setTimeStamp} />

      <div className='userRanking'>
        {!ranking ? <Pending /> : <UsersRanking ranking={ranking.ranking} />}
      </div>

      <div className='userSteps'>
        {!userSteps ? <Pending /> : <UserSteps userSteps={userSteps.userSteps} totalSteps={userSteps.totalSteps} setTimeStamp={setTimeStamp} userId={user.id} />}
      </div>
    </>
  )
}

export default UserProfile