import React, { useState } from 'react'

const Login = () => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')


    const onSubmitHandler = async (e) =>{
        try {
            e.preventDefault();
        } catch (error) {
            
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Panel de Admistrador</h1>
            <form onSubmit={onSubmitHandler}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700'>Correo Electrónico</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com required' />
                </div>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700'>Contraseña</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Ingresa tu contraseña' />
                </div>
                <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type="submit">Ingresar</button>
            </form>
        </div>
    </div>
  )
}

  export default Login