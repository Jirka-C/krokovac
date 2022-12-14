import Head from 'next/head';
import React, { createContext, useEffect, useState } from 'react'
import Pending from '../Components/Pending';
import UserProfile from '../Components/UserProfile';
import UserSelect from '../Components/UserSelect';

export const UserContext = createContext();

function Home() {

  const [pending, setPending] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
    setPending(false)
  }, [])


  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

        <meta property="og:type" content="website" />
        <meta property="og:image" content="og-image.jpg" />
        <meta property="og:url" content="" />
        <meta property="og:title" content="Dávaj šupy, posilujme trupy" />
        <meta property="og:description" content="Jsme šlápoty, tak šlapeme" />
      </Head>

      <div className='app'>
        {pending ? <Pending /> : 
          <UserContext.Provider value={setUser}>
            {!user ? <UserSelect /> : <UserProfile user={user}/>}
          </UserContext.Provider>
        }
      </div>
    </>
  )
}

export default Home