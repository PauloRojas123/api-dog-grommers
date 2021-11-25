import User from '../model/User.js'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import Role from '../model/Role.js'

export const signup = async (req, res) => {
    
    const payload = req.body

    const newUser = new User( {...payload, password: await User.encryptPassword(payload.password)
    
    })

    if (payload.roles) {
        const foundRoles = await Role.find({name: {$in: payload.roles}})
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({name: "user"})
        newUser.roles = [role._id];
    }

    const savedUser = await newUser.save()
    console.log(savedUser)

    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400 //24 hours
    })

    res.status(200).json({token})
    res.json(payload)

}

export const signin = async (req, res) => {

    const payload = req.body
    
    const userFound = await User.findOne({userName: payload.userName}).populate('roles');

    if (!userFound) return res.status(400).json({message: "User not found"})

    const matchPassword = await User.comparePassword(payload.password, userFound.password)

    if (!matchPassword) return res.status(401).json({token: null, message: 'Invalid password'})

    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400
    })

    res.json({token},payload)

}
      