import React from 'react'
import { TableRow } from './TableRow'

export const Table = ({ input }) => {  

  return (
    <>
      {input.length > 0 
      ? <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>
                  Текст
                </th>
                <th>
                  Количество слов
                </th>
                <th>
                  Количество гласных
                </th>
              </tr>
            </thead>
            <tbody>
              {input.map(entry => (
                <TableRow key={Math.random()} entry={entry}/>
              ))}
            </tbody>
          </table>
        </div> 
      : <div className='table-container'>Данных пока нет. . .</div>}
    </>
    
  )
}

