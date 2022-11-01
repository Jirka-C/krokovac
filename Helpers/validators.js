export const validateDate = (date) => {
  if(date && new Date(date).toISOString().split('T')[0] <= new Date().toLocaleString('sv').split(' ')[0]){
    return true
  }

  return false
}

export const validateSteps = (steps) => {
  if(steps && steps > 0){
    return true
  }

  return false
}