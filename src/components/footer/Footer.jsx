import React from 'react'
import './footer.css'
const Footer = () => {
  return (
    <div className='footer bg-danger border-0' style={{ backgroundColor:'#ef3123',  justifyContent:'center'}}>
      <footer className="d-flex  justify-content-center align-items-center py-3 my-4 border-top">
    <div className=" "   style={{ color:'white', fontWeight:"bold"}}  >
      <span    >© 2023 FoodCheetah, Inc</span>
    </div>
  </footer>
    </div>
  )
}

export default Footer
