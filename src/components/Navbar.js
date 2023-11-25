import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from "react-bootstrap/Badge"
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
//import { Modal } from 'mongoose';
export default function Navbar() {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate=useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem("authToken");
    navigate("/Login");
  }
  return (

    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "green"}}>
        
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFoodie</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mx-1">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/" style={{textDecorationLine:"underline"}}>Home</Link>
              </li>
              {(localStorage.getItem("authToken"))
                ? <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrder"  style={{textDecorationLine:"underline"}}>My Orders</Link>
                </li>
                : ""}
            </ul>

            {(!localStorage.getItem("authToken"))
              ?
              <div className='d-flex'>

                <Link className="btn mx-1" style={{ backgroundColor: "#282c34" }} to="/Signup">SignUp</Link>
                <Link className="btn bg-white mx-1" style={{ backgroundColor: "#282c34" }} to="/Login">SignIn</Link>

              </div>
              : 
              <div>
                <div className='btn mx-2' style={{ backgroundColor: "#282c34", color: "greenyellow" }} onClick={()=>{setCartView(true)}}>
                  My Cart{"  "}
                 {data.length === 0 ? "":<Badge pill style={{backgroundColor:"red"}}>{" "}{data.length}</Badge>}  
                </div>
                {cartView? <Modal onClose={()=>setCartView(false)}><Cart></Cart></Modal>:null}
                <div className='btn mx-2' style={{ backgroundColor: "#282c34", color: "red" }} onClick={handleLogout}>
                  Logout
                </div>
              </div>}

          </div>
        </div>
      </nav>


    </div>
  )
}
