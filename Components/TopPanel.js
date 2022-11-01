import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../pages';

function TopPanel({activeUser}) {

  const setUser = useContext(UserContext)
  const [users, setUsers] = useState([])
  const [showUsers, setShowUsers] = useState(false)

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/users/`)
    .then(response => {
        if(response.data){
          setUsers(response.data.users.filter(user => activeUser.id !== user.id))
        }
    })
    .catch(error => {
    })
    .finally(
    );
  }, [activeUser])

  const userClick = (user) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user));
    setShowUsers(false)
  }

  return (
    <div className='topPanel'>
      <div className='topPanel__avatar' onClick={() => setShowUsers(!showUsers)}>
        <img src={`avatars/${activeUser.avatar}`} alt={activeUser.name} />
      </div>
      <div className={`topPanel__users${showUsers ? ' topPanel__users--active' : ""}`}>
        {users.map(user => (
          <div className='topPanel__avatar' key={user.id} onClick={() => userClick(user)}>
            <img src={`avatars/${user.avatar}`} alt={user.name} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopPanel