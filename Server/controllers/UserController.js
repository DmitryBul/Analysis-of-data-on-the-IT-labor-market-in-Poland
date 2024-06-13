import jwt from 'jsonwebtoken';
import express from 'express';
import bcrypt from 'bcrypt'
import User from '../db/models/User.js';
import Data from '../db/models/Data.js';
import { check, validationResult } from 'express-validator';
import { registerValidator, loginValidator } from '../validations/auth.js'
import checkAuth from '../utils/checkAuth.js';

const app = express();
app.use(express.json());

export const register = app.post('/auth/register', registerValidator, async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()){
        return res.status(400).json(errors.array());
      }
  
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const Hash = await bcrypt.hash(password, salt);
  
      const doc = new User({
        email: req.body.email,
        username: req.body.username,
        passwordHash: Hash,
      })
  
      const user = await doc.save();
  
      const token = jwt.sign({
          _id: user._id,
        },
        'secret123',
        {
          expiresIn: '30d'
        },
      )
  
      const { passwordHash, ...userData } = user._doc;
  
      res.json({
        ...userData,
        token,
      })
  
      //res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Rejestracja się nie udała',
      })
    }
  });

  export const login = app.post('/auth/login', loginValidator, async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email })
  
      if (!user) {
        return res.status(404).json({
          message: 'Nieprawidłowy login albo hasło'
        })
      }
  
      const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
  
      if (!isValidPass) {
        return res.status(400).json({
          message: 'Nieprawidłowy login albo hasło'
        })
      }
  
      const token = jwt.sign({
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d'
      },
    ) 
  
    const { passwordHash, ...userData } = user._doc;
  
      res.json({
        ...userData,
        token,
      })
  
    } catch(err) {
        console.log(err);
        res.status(500).json({
          message: 'Logowanie się nie udało',
        })
    }
  })

  export const getMe = app.get('/auth/me', checkAuth, async (req, res) => {
    try {
      const user = await User.findById(req.userId) 
  
      if (!user){
        return res.status(404).json({
          message: 'Nie znaleziono użytkownika'
        })
      }
  
      const { passwordHash, ...userData } = user._doc;
  
      res.json(userData)
    } catch(err) {
      console.log(err);
      res.status(500).json({
        message: 'Nie ma dostępu',
      })
    }
  })
  