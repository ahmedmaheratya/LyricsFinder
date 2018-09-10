import React from 'react'
import spinner from './lg.ring-loading-gif.gif'

export default () => {
  return (
    <div className="spinner">
      <img
        src={spinner}
        alt="loading..."
        style={{ width: '200px', margin: '40px auto', display: 'block'}} 
      />
    </div>
  )
}
