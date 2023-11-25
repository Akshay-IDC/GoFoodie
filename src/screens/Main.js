import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
//import Corousel from '../components/Corousel'

export default function Main() {
  
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState([])
  const [items, setItems] = useState([])

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/fooddata", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();

    // console.log(response[0],response[1]);

    setItems(response[0]);
    setCategory(response[1]);
  }

  useEffect(() => {
    loadData();

  }, [])


  return (
    <div>
      <div><Navbar></Navbar></div>
      <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel"  >

        <div className="carousel-inner" id='carousel'>
          <div className='carousel-caption' style={{ zIndex: '10' }} >
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
              {/*<button className="btn btn-outline-success text-white" type="submit">Search</button>*/}
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" style={{ filter: 'brightness(40%)', objectFit: "contain !important" }} alt="..." />
          </div>
          <div className="carousel-item" >
            <img src="https://source.unsplash.com/random/900×700/?snacks" className="d-block w-100" style={{ filter: 'brightness(40%)', objectFit: "contain !important" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900×700/?pastrys" className="d-block w-100" style={{ filter: 'brightness(40%)', objectFit: "contain !important" }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
      <div className='container'>
        {
          category !== []
            ? category.map((data) => {
              return (<div className='row mb3'>
                <div key={data._id} className='fs-3 m-3'>
                  {data.CategoryName}</div>
                <hr />
                {items !== []
                  ? items.filter((itemsData) => (itemsData.CategoryName === data.CategoryName) && (itemsData.name.toLowerCase().includes(search.toLocaleLowerCase())) ) 
                    .map(filterItems => {
                      return (
                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                          <Card 
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                            
                            //description={filterItems.description}
                          ></Card>
                        </div>
                      
                      )
                    })
                   : <div> No such Data Found</div>}
              </div>
              )
            })
            : ""
        }

      </div>
      <div><Footer /></div>
    </div>
  )
}
