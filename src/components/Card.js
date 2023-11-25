import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
export default function Card(props) {

    let data = useCart();
    let dispatch = useDispatchCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return

            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
                return
            }
            return 
        }
        //console.log(data);
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })

    }
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <div>
            <div>
                <div className="card mt-3 m-1" style={{ width: '18rem', maxHeight: '400px' }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "180px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h4 className="card-title">{props.foodItem.name}</h4>
                        <p className="card-text " >{props.description}</p>
                        <div className='container w-100'>
                            <select className='m-1 h-100 rounded text-black' style={{ backgroundColor: "lightgreen" }} onChange={(e) => setQty(e.target.value)}>
                                {
                                    Array.from
                                        (Array(6), (e, i) => {
                                            return (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            )
                                        }
                                        )
                                }
                            </select>
                            <select className='m-1 h-100 rounded text-black' ref={priceRef} style={{ backgroundColor: "lightgreen" }} onChange={(e) => setSize(e.target.value)}>
                                {priceOptions.map((data) => {
                                    return (<option key={data} value={data}>{data}</option>)
                                })}
                            </select>
                            <div className='d-flex h-100'>
                                Price=Rs{finalPrice}/-
                            </div>
                        </div>
                        <hr />
                        <button className='btn jsutify-center ms-3 text-black' style={{ backgroundColor: "lightgreen" }} onClick={handleAddToCart}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
