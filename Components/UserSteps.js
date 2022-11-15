import axios from 'axios'
import React, { useState } from 'react'

import { validateDate } from '../Helpers/validators'
import { validateSteps } from '../Helpers/validators'
import ConfirmModal from './ConfirmModal'

function UserSteps({userSteps, totalSteps, setTimeStamp, userId, loggedUser}) {

  const formatNumber = (steps) => (steps.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "))

  const [steps, setSteps] = useState(null)
  const [date, setDate] = useState(null)
  const [editingRow, setEditingRow] = useState(null)
  const [validDate, setValidDate] = useState(true)
  const [validSteps, setValidSteps] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const editSteps = (stepId, steps, date) => {
    setEditingRow(stepId)
    setDate(date)
    setSteps(steps)
  }

  const dateChange = (date) => {
    setDate(date)
    setValidDate(validateDate(date))
  }

  const stepsChange = (steps) => {
    setSteps(steps)
    setValidSteps(validateSteps(steps))
  }

  const saveEdit = (rowId, steps, date) => {

    if(!validDate || !validSteps){
      return
    }

    axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/save/save/${userId}`,
      JSON.stringify({
        date: date,
        steps: steps,
        rowId: rowId
      })
    )
    .then(function (response) {
      setTimeStamp(new Date())
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const deleteStep = (stepId) => {
    if(!stepId){
      return;
    }

    axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/save/delete/${stepId}`)
    .then(function (response) {
      setTimeStamp(new Date())
      setShowDeleteModal(false)
    })
    .catch(function (error) {
      console.log(error);
    });    
  }

  return (
    <div className='container'>

      {showDeleteModal && <ConfirmModal setShowDeleteModal={setShowDeleteModal} confirmAction={deleteStep} deletedId={editingRow} />}

      <h2 className='userSteps__title'>{userSteps.length ? "Můj přehled" : "Zatím tady není ani krok"}</h2>
      {userSteps.length ? <div className='userSteps__row userSteps__row--header'>
        <div className='userSteps__header-date'>Datum</div>
        <div className='userSteps__header-steps'>Kroky</div>
        <div className='userSteps__header-meters'>Kilometry</div>
      </div> : null}
      {userSteps.map(step => (
        <div className={`userSteps__row ${step.id === editingRow ? "userSteps__row--edit" : ""}`} key={step.id}>
          <div className='userSteps__date'>{step.id === editingRow
            ? <input type={"date"}
                     value={new Date(date).toLocaleString('sv').split(' ')[0]}
                     onChange={(e) => dateChange(e.target.value)} 
                     required
                     max={new Date().toLocaleString('sv').split(' ')[0]}
                     className={!validDate ? "userSteps__steps--error" : ""}
              />
            : new Date(step.date).toLocaleDateString()}
          </div>
          <div className='userSteps__steps'>{step.id === editingRow
            ? <input type={"number"}
                     value={steps}
                     onChange={(e) => stepsChange(e.target.value)}
                     required
                     min={1}
                     className={!validSteps ? "userSteps__steps--error" : ""}
              />
            : formatNumber(step.steps)}
          </div>
          <div className='userSteps__meters'>{(((step.steps * step.step_ratio).toFixed(0))/1000).toFixed(2)} km</div>
          {loggedUser.id === step.user_id && 
            <div className='userSteps__edit'>{step.id === editingRow
              ? <>
                  <img src='icons/save.svg' onClick={() => saveEdit(step.id, steps, date)} />
                  <img src='icons/trash.svg' onClick={() => {setShowDeleteModal(true)}} />
                  <img src='icons/close.svg' onClick={() => setEditingRow(null)} />
                </>
              : <img src='icons/edit.svg' onClick={() => editSteps(step.id, step.steps, step.date)} />}
            </div>          
          }
        </div>
      ))} 
      {totalSteps && <div className='userSteps__row userSteps__row--header'>
        <div className='userSteps__total'>Celkem</div>
        <div className='userSteps__totalSteps'>{formatNumber(totalSteps)}</div>
        <div className='userSteps__meters'>{(((totalSteps * userSteps[0].step_ratio).toFixed(0))/1000).toFixed(2)} km</div>
      </div>}
    </div>
  )
}

export default UserSteps