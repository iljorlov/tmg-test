import React, { useEffect } from 'react'

export const SearchBar = ({ input, setInput }) => {

  // add event listeners so that highlighted invalid inputs become 'unhighlighted' on click
  useEffect(() => {
    const invalidSpans = document.querySelectorAll('.input-wrong')
    const handleInvalidSpanClick = (span) => {
      span.classList.remove('input-wrong')
    }
    // add event listeners
    for (let span of invalidSpans){
      span.addEventListener('click', () => handleInvalidSpanClick(span))
    }
    // remove event listeners
    return () => {
      for (let span of invalidSpans){
        span.removeEventListener('click', () => handleInvalidSpanClick(span))
      }
    }
  }, [])

  // handler function that formats user input into a formatted array of idendifiers
  const handleSubmit = () => {

    let textDiv = document.getElementById('input-area')

    // get rid of whitespaces
    const arrayToCheck = textDiv.innerText.split(' ').join('').split(/,|;/)

    // make an object with each entered value and valid toggle
    // we need a valid field to show invalit inputs to the user
    const inputObj = {}
    for (let i of arrayToCheck){
      inputObj[i] = {
        value: i,
        // test if string is only whitespaces, then check if the string is a valid integer without dots at the end
        // we will need the valid property when highlighting invalit inputs
        valid: i.endsWith('.') ? false : ((/\w+/).test(i) ? (i % 1 === 0 ? true : false) : false)
      }
    }

    //alert an error if input has invalid data
    for ( let i in inputObj ){
      if (inputObj[i].valid === false){
        window.alert('Пожалуйста, вводите правильные идентификаторы: только целочисленные значения, разделенные запятой или двоеточием')
        break
      }
    }

    // push only valid inputs to validArray
    let validArray = []
    for (let i in inputObj){
      if (inputObj[i].valid){
        validArray.push(inputObj[i].value)        
      }
    }

    // arrayToRender - needed to highlight user's invalid inputs
    let arrayToRender = []
    for (let i in inputObj){
      if (inputObj[i].valid){
        arrayToRender.push(`<span>${inputObj[i].value}</span>`)
      } else if (inputObj[i].value !== ''){
        arrayToRender.push(`<span class='input-wrong'>${inputObj[i].value}</span>`)
      } else {
        continue
      }
    }

    // update innetHTML of user input area to hightlight invalid inputs
    textDiv.innerHTML = arrayToRender.join(", ")

    // filter out repeating values and set state in parent component
    setInput(validArray.filter((v, i, a) => a.indexOf(v) === i ))
  }

  return (
      <div className='searchbar-container'>
          <p>Идентификаторы строк: </p>
          {/* Below we use a div with 'contenteditable' property instead of <input/> to be able to change its innerHTML to highlight incorrect inputs */}
          <div contentEditable suppressContentEditableWarning='true' spellCheck='false' id="input-area" ></div>
          <button onClick={handleSubmit}>Подсчитать</button>
      </div>
  )
}
