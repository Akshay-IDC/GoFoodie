import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("https://mernapp-1zor.onrender.com/api/myorderData",//"http://localhost:5000/api/myorderData",
         {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })



        // await res.map((data)=>{
        //    console.log(data)
        // })


    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div>
            <div >
                <Navbar />
            </div>

            <div className='container'>
                <div className='row' >

                    {orderData !== {} ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div  >
                                                    {arrayData.Order_date ? <div className='m-auto mt-5 fs-2' style={{ color: "lightseagreen" }}>

                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :

                                                        <div className='col-12 col-md-6 col-lg-3' style={{ display: "flex" }}>
                                                            <div className="card mt-3" style={{ width: "20rem", maxHeight: "360px", borderBlockColor: "greenyellow" }}>

                                                                <div className="card-body" style={{ display: '' }}>
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "50px", display: "inline" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>

                                                                        <span className=' ms-2 h-100 w-20 fs-5' >
                                                                            Price: ₹{arrayData.price}/-
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : ""
                        )
                    }) : ""}
                </div>


            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}