import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";


const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Route para Ingreso Usuario

const loginUser=async(req, res)=>{

}

//Route para Registro Usuario
const registerUser = async(req,res)=>{
    try {
        const{name,email,password}=req.body;

        //checar si usuario existe o no
        const exists=await userModel.findOne({email});
        if (exists){
            return res.json({success:false, message:"El usuario ya existe"})
        }

        //validar formato email y contraseña fuerte
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Porfavor ingresa un correo válido"})
        }
        if(password.length<8){
            return res.json({success:false, message:"Porfavor ingresa una contraseña fuerte"})
        }

        // ocultar contraseña de usuario
        const salt=await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser=new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user=await newUser.save()

        const token= createToken(user._id)

        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        rs.json({succes:false,message:error.message})
        
    }

}

//Route para Ingreso Administrador

const adminLogin = async(req,res)=>{

}


export {loginUser, registerUser, adminLogin}
