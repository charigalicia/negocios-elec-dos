import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";


// Poniendo pedido usando metodo COD

const placeOrder = async (req,res)=>{
    try {
        const {userId, items, amount, address}=req.body;

        const orderData ={
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment: false,
            date:Date.now()
        }

        const newOrder= new orderModel (orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate (userId,{cart:{}})

        res.json({success:true, message:"Pedido realizado"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}

// Poniendo pedido usando método Stripe
const placeOrderStripe = async (req,res)=>{
    
}

// Todos los datos de los pedidos en admin panel
const allOrders = async (req,res)=>{
    
}

// Datos del pedido usuario Frontend
const userOrders = async (req,res)=>{
    try {
        const {userId }=req.body
        const orders =await orderModel.find({userId})
        res.json({success:true, orders })
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
    
}

// Actualizar estados de pedidos desde panel admin
const updateStatus = async (req,res)=>{
    
}

export {placeOrder,placeOrderStripe,allOrders, userOrders, updateStatus}