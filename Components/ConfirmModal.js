import React from 'react'

function ConfirmModal({setShowDeleteModal, confirmAction, deletedId}) {
  return (
    <div className='confirmModal'>
      <div className='confirmModal__overlay'></div>
      <div className='confirmModal__box'>
        <h2 className='confirmModal__title'>Opravdu chcete záznam smazat?</h2>

        <div className='confirmModal__buttons'>
          <button className='confirmModal__button confirmModal__button--error' onClick={() => confirmAction(deletedId)}>Ano</button>
          <button className='confirmModal__button confirmModal__button--success' onClick={() => setShowDeleteModal(false)}>Ne</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal