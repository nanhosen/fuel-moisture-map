export function spaceToPercent(str){
  return str.replace(/ /g, '%20')
}

export function dashToComma(str){
  return str.replace(/-/g, ', ')
}


export const checkIfMatches = (array, checkVal)=>{
  // console.log('array', array)
  // console.log('checkVal', checkVal)
  const statusObj = {exists: false}
  array.map(curr =>{
    if(curr == checkVal){
      statusObj.exists = true
    }
  })
  return statusObj.exists
}