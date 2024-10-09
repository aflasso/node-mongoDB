const { response, request, json } = require("express");

const bcrypt = require('bcrypt')

const mongoose = require('mongoose')

const User = require('../models/users')

const getAllUsers = async (req = request, res = response) => {

    console.log("All users")

    try {

        const users =  await User.find()
        console.log(users);
        return res.status(200).json({status: 'ok', data: users})

    } catch (error) {
        
        console.error('Ocurrio un error al obtener los usuarios', error);
        return res.status(500).json({status: 'error', error: error})
    }
}

const getOneUserByEmail = async (req = request, res = response) => {
    
    const email = req.params.email
    console.log('One user');
    
    try {
        
        const user = await db.findOne({email : email})

        console.log(user)

        if (user) {
            return res.status(200).json({status: 'ok', data: user})
        }

        return res.status(404).json({status: 'fail', error: 'El usuario no se encontro'})

    } catch (error) {
        console.error(error);
        return res.status(500).json({status:'error', error: error})
    }

}

const postUser = async (req = request, res = response) => {

    const {name, email, password} = req.body

    try {

        const existingUser = await db.findOne({email: email})

        if (existingUser) {
            return res.status(400).json({status: 'fail', error: 'El correo ya se esta usando'})
        }

        const hashedPassword = bcrypt.hashSync(password, 10)
        const newUser = await db.insertOne({name: name, email:email, password: hashedPassword})

        res.status(201).json({status:'ok', data: newUser})

    } catch (error) {
        console.error(error);
        return res.status(500).json({status:'error', error: error})
    }

}

const updateUserByEmail = async (req = request, res = response) => {

    const userEmail = req.params.email
    const {name, email} = req.body

    try {

        const newUser = await db.findOneAndUpdate({email: userEmail}, {$set: {name: name, email: email}}, {returnDocument: 'after'})

        if (newUser) {
            console.log(newUser)
            return res.status(200).json({status:'ok', data: newUser})
        }

        return res.status(404).json({status: 'fail', error: 'No se encontro el usuario'})

    }catch (error) {
        console.error('Ocurrio un error al modificar el usaurio', error);
        return res.status(500).json({status: 'error', error: error})
    }

}

const deleteUserByEmail = async (req = request, res = response) => {

    const userEmail = req.params.email

    try {
        
        const deletedUser = await db.findOneAndDelete({email : userEmail})

        if (deletedUser) {
            console.log('Usuario eliminado', deletedUser)
            return res.status(200).json({status:'ok', data: deletedUser})
        }

        return res.status(401).json({status: 'fail', error: 'No existe el usuario'})

    } catch (error) {
        console.error('Ocurrio un error al eliminar el usuario');
        return res.status(500).json({status: 'error', error: error})
    }

}

module.exports = {getAllUsers, getOneUserByEmail, postUser,updateUserByEmail, deleteUserByEmail}