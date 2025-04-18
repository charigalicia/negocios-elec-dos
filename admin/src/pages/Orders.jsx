import React from 'react'
import { useEffect, useState } from 'react'
import {assets} from '/src/assets/assets'
import axios from 'axios'
import {backendUrl, currency} from '../App'
import {toast} from 'react-toastify'



const Orders = ({token}) => {

  const [orders,setOrders]=useState([])

  const fetchAllOrders = async ()=>{
    if (!token){
      return null;
    }

    try {
      const response =await axios.post(backendUrl + '/api/order/list',{},{headers:{token}})
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
        
      }else{
        toast.error(response.data.message)
      }

    }catch (error) {
      toast.error(error.message)

    }

  }

  const statusHandler= async (event, orderId)=>{
    try{
      const response = await axios.post(backendUrl+'/api/order/status', {orderId, status:event.target.value}, {headers:{token}})
      if (response.data.success) {
        await fetchAllOrders()
        
      }
    }catch (error){
      console.log(error);
      toast.error(response.data.message)  
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  },[token])


  return (
    <div>
      <h3>Página de pedidos</h3>
      <div>
        {
          orders.map((order,index)=>(
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
              <img className='w-12' src={assets.parcel_icon} alt="" />
              <div>
              <div>
                {order.items.map((item,index)=>{
                  if (index === order.items.length-1) {
                    return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span> </p>
                  }else{
                    return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span>, </p>
                  }
                })}

              </div>
              <p className='mt-3 mb-2 font-medium' >{order.address.firstName + " "+ order.address.lastName}</p>
              <div>
                <p>{order.address.street+", "}</p>
                <p>{order.address.city+", "+order.address.state+", "+ order.address.country+", "+order.address.zipcode}</p>
                
              </div>
              <p>{order.address.phone}</p>

              </div>

              <div>
                <p className='text-sm sm:text-[15px]'>Productos : {order.items.length}</p>
                <p className='mt-3' >Método de pago : {order.paymentMethod}</p>
                <p >Pago: {order.payment ? 'Hecho' : 'En proceso'}</p>
                <p>Fecha : {new Date(order.date).toLocaleDateString()}</p>
              </div>

              <p className='text-sm sm:text-[15px]' >{currency} {order.amount}</p>
              <select onChange={(event)=>statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold' >
                <option value="OrderPlaced">Pedido hecho</option>
                <option value="Packing">Empaquetando</option>
                <option value="Shipped">Enviado</option>
                <option value="Out of delivery">En camino</option>
                <option value="Delivered">Entregado</option>
              </select>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders