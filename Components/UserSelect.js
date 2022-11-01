import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Pending from './Pending';
import UserDetail from './UserDetail';

function UserSelect() {

  const [pending, setPending] = useState(true)
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/users/`)
    .then(response => {
        if(response.data){
          setUsers(response.data.users)
          setPending(false)
        }
    })
    .catch(error => {
    })
    .finally(
    );
  }, [])

  return (pending ? <Pending /> : 
    <section className='userSelect'>
      <div className='userSelect__box'>
        <div className='userSelect__header'>
          <h2 className='userSelect__title'>Vyber si svou postavu</h2>
        </div>

        <div className='userSelect__content'>
          {users.map(user => (
            <UserDetail key={user.id} user={user} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default UserSelect