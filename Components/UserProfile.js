import React, { useEffect, useState } from 'react'
import useGetData from '../Hooks/useGetData'
import Pending from './Pending'
import TopPanel from './TopPanel'
import UsersRanking from './UsersRanking'
import UserSteps from './UserSteps'
import SubmitForm from './SubmitForm'

function UserProfile({user}) {

  const [loggedUser, setLoggedUser] = useState(user);
  const [activeUser, setActiveUser] = useState(user);
  const [timeStamp, setTimeStamp] = useState(new Date());
  //const [selectedDate, setSelectedDate] = useState(timeStamp.getMonth() + 1)
  const [selectedDate, setSelectedDate] = useState(1)
  const dateString = (new Date(timeStamp.getFullYear(), timeStamp.getMonth() + selectedDate, 1).toISOString().split("T")[0]).substring(0, 7)

  useEffect(() => {
    setActiveUser(user)
    setLoggedUser(user)
  }, [user])
  

  const {data: ranking, loading: rankingLoading, error: rankingError} =  useGetData(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/steps/ranking/`, dateString, timeStamp);
  const {data: userSteps, loading: stepsLoading, error: stepsError} =  useGetData(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/steps/steps/${activeUser.id ?? activeUser.user_id}`, dateString, timeStamp);

  return (
    <>
      <TopPanel activeUser={loggedUser} />

      <div id="formAnchor"></div>
      <section className='userProfile'>
        <div className='userProfile__name'>{activeUser.name}</div>
        <div className='userProfile__avatar'>
          <img src={`avatars/${activeUser.avatar}`} alt={activeUser.name} />
        </div>
      </section>

      {(loggedUser.id === (activeUser.user_id ?? activeUser.id)) && <SubmitForm user={activeUser} setTimeStamp={setTimeStamp} />}

      <section className='calendar'>
        <div className='container'>
          <div className='calendar__content'>
            <button className='calendar__button' onClick={() => setSelectedDate((current) => current - 1)}>&#11164;</button>
            <div className='calendar__month-name'>
              {new Date(timeStamp.getFullYear(), timeStamp.getMonth() + selectedDate - 1, 1).toLocaleDateString('default', {year: 'numeric', month: 'long'})}
            </div>
            <button className='calendar__button' onClick={() => setSelectedDate((current) => current + 1)}>&#11166;</button>
          </div>
        </div>
      </section>

      <div className='userRanking'>
        {!ranking ? <Pending /> : <UsersRanking ranking={ranking.ranking} setActiveUser={setActiveUser} />}
      </div>

      <div className='userSteps'>
        {!userSteps
          ? <Pending />
          : <UserSteps userSteps={userSteps.userSteps}
                       totalSteps={userSteps.totalSteps}
                       setTimeStamp={setTimeStamp}
                       userId={activeUser.id ?? activeUser.user_id}
                       loggedUser={loggedUser} />}
      </div>
    </>
  )
}

export default UserProfile