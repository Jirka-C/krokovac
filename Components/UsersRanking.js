import React from 'react'

function UsersRanking({ranking, setActiveUser}) {

  const formatNumber = (steps) => (steps.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "))

  return (
    <div className='container'>
      {ranking.length ? <h2 className='userSteps__title'>Jak jsme na tom</h2> : null}
      {ranking.length ? <div className='userRanking__row userRanking__row--header'>
        <div className='userRanking__header-name'>Jméno</div>
        <div className='userRanking__header-steps'>Kroky</div>
        <div className='userRanking__header-meters'>Kilometry</div>
      </div> : null}
      {ranking.map( (rank, index) => (
        <div className='userRanking__row' key={rank.user_id}>
          <div className='userRanking__rank'>{index + 1}</div>
          <div className='userRanking__avatar' onClick={() => setActiveUser(rank)}>
            <img src={`avatars/${rank.avatar}`} alt={rank.name}/>
          </div>
          <div className='userRanking__name' onClick={() => setActiveUser(rank)}>{rank.name}</div>
          <div className='userRanking__steps'>{formatNumber(rank.total_steps)}</div>
          <div className='userRanking__meters'>({(parseFloat(rank.total_steps * rank.step_ratio).toFixed(0)/1000).toFixed(2)} km)</div>
        </div>        
      ))}
    </div>
  )
}

export default UsersRanking