import React, { useContext } from 'react'
import { UserContext } from '../pages';

function UserDetail({user}) {

  const setUser = useContext(UserContext)

  const userClick = (user) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user));
  }

  return (
    <div key={user.id} className='userSelect__user' onClick={() => userClick(user)}>
      <div className='userSelect__avatar'>
        <img src={`avatars/${user.avatar}`} alt={user.name} />
      </div>
      <div className='userSelect__name'>
        {user.name}
      </div>
    </div>
  )
}

export default UserDetail