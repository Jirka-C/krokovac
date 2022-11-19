import axios from 'axios'
import React, { useState } from 'react'
import { validateDate } from '../Helpers/validators'
import { validateSteps } from '../Helpers/validators'

function SubmitForm({user, setTimeStamp}) {

  const [date, setDate] = useState(new Date().toLocaleString('sv').split(' ')[0])
  const [steps, setSteps] = useState(0)
  const [validDate, setValidDate] = useState(true)
  const [validSteps, setValidSteps] = useState(true)
  
  const dateChange = (date) => {
    setDate(date.value)
    setValidDate(validateDate(date.value))
  }

  const stepsChange = (steps) => {
    setSteps(parseInt(steps.value))
    setValidSteps(validateSteps(steps.value))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(!validDate || !validSteps){
      return
    }

    axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/save/save/${user.id ?? user.user_id}`,
      JSON.stringify({
        date: date,
        steps: steps
      })
    )
    .then(function (response) {
      setTimeStamp(new Date())
      setSteps(0)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <section className='submitForm'>
      <div className='container'>
        <form className='submitForm__form' onSubmit={e => onSubmit(e)}>
          <div className='submitForm__block'>
            <label className='submitForm__label'>Den</label>
            <input className='submitForm__input' type="date" value={date} onChange={(e) => dateChange(e.target)} required max={new Date().toLocaleString('sv').split(' ')[0]} />
            {!validDate && <label className='submitForm__error'>V datu bude chybka</label>}
          </div>

          <div className='submitForm__block'>
            <label className='submitForm__label'>Počet kroků</label>
            <input className='submitForm__input' type="number" value={steps > 0 ? steps : ''} placeholder='12 345' onChange={(e) => stepsChange(e.target)} required min={1} />
            {!validSteps && <label className='submitForm__error'>Chce to aspoň jeden krok</label>}
            {steps > 0 && <label className='submitForm__error submitForm__error--no-error'>{((steps * user.step_ratio).toFixed(0)/1000).toFixed(2)} km</label>}
          </div>

          <div className='submitForm__block submitForm__block--button'>
            <button className='submitForm__input submitForm__input--button' type="submit" disabled={!validDate || !validSteps || !steps}>Uložit</button>
            {!validSteps || !validDate || steps ? <label className='submitForm__error'>&nbsp;</label> : null}
          </div>
        </form>
      </div>
    </section>
  )
}

export default SubmitForm