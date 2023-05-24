import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { validateDate } from '../Helpers/validators'
import { validateSteps } from '../Helpers/validators'
import getToastData from '../Helpers/getToastData';

function SubmitForm({user, setTimeStamp}) {

  let counter;
  const [date, setDate] = useState(new Date().toLocaleString('sv').split(' ')[0])
  const [steps, setSteps] = useState(0)
  const [validDate, setValidDate] = useState(true)
  const [validSteps, setValidSteps] = useState(true)
  const [toasts, setToasts] = useState([])
  const [sending, setSending] = useState(false)
  
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
    const randId = Math.floor(Math.random()*100)

    if(!validDate || !validSteps || sending){
      return
    }

    setSending(true)
    axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/save/save/${user.id ?? user.user_id}`,
      JSON.stringify({
        date: date,
        steps: steps
      })
    )
    .then(function (response) {
      setTimeStamp(new Date())
      setToasts( prevState => ([...prevState, getToastData(randId)[response.status]]))
    })
    .catch((error) => {
      setToasts( prevState => ([...prevState, getToastData(randId)[error.response.status]]))
    })
    .finally(() => {
      setSteps(0)
      setSending(false)
      counter = setTimeout(() => {
        setToasts(prevState => prevState.slice(1))
      }, 10000)
    });
  }

  const closeToast = (id) => {
    setToasts(prevState => prevState.filter(toast => toast.id !== id))
  }

  useEffect(() => {
    return() => {
      clearInterval(counter)
    }
  },[])
  

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
            <button className='submitForm__input submitForm__input--button' type="submit" disabled={!validDate || !validSteps || !steps || sending}>
              {sending ? <span className='submitForm__loading'></span> : "Uložit"}
            </button>
            {!validSteps || !validDate || steps ? <label className='submitForm__error'>&nbsp;</label> : null}
          </div>
        </form>

        {toasts.length ? <div className='toasts'>
          {toasts.map( (toast, index) => <div className={`toasts__item toasts__item--${toast.role}`} key={index}>
            <div className='toasts__close' onClick={() => closeToast(toast.id)}>&times;</div>
            <div className='toasts__content'>
              {toast.text}
            </div>
          </div>)}
        </div> : null}
      </div>
    </section>
  )
}

export default SubmitForm