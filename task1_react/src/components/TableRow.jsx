import React, { useEffect, useState } from 'react'

export const TableRow = ({ entry }) => {

  const [data, setData] = useState('')

  useEffect(() => {
    const url = 'https://tmgwebtest.azurewebsites.net/api/textstrings/'
    //set header for fetch request
    const config = {
      headers: {
        'TMG-Api-Key': '0J/RgNC40LLQtdGC0LjQutC4IQ=='
      }
    }
    fetch(`${url}${entry.toString()}`, config)
      .then(res => res.json())
      .then(
        (res) => {
          setData(res)
        },
        (err) => {
          setData('error')
        }
      )
        
  }, [entry])

  // function to get a number of words in a string
  const countWords = (str) => {
    return str.split(' ').length
  }

  //function to get a number of vowels in a string
  const countVowels = (str) => {
    // vowels in German/English/French/Russian
    // 'y' is a vowel since it is a vowel in French
    const vowelsList = 'aeiuoy'+'ауоыэяюёие'.split('')

    let count = 0
    for ( let letter of str.split('') ){
      if (vowelsList.includes(letter.toLowerCase())){
        count+=1
      }
    }
    return count
  }

  return (
    <>
      { data !== 'error' 
      ? ( data!== '' ? 
        <tr className='table-row'>
          <td className='table-text-field'>{data.text}</td>
          <td>{countWords(data.text)}</td>
          <td>{countVowels(data.text)}</td>
        </tr> : <></>) 
      : <tr>
          <td className='table-text-field' colSpan='1'><b>{`Не удалось загрузить данные по идентификатору ${entry}`}</b></td>
        </tr>}
    </>
    
  )
}
