import { body } from 'express-validator'

const registerValidator = [
    body('email', 'Nieprawidłowy email').isEmail(),
    body('password', 'Hasło musi zawierać min. 5 symbole').isLength({ min: 5 }),
    body('username', 'Username musi zawierać min. 3 symbole').isLength({ min: 3 }),
]

const loginValidator = [
    body('email', 'Nieprawidłowy email').isEmail(),
    body('password', 'Hasło musi zawierać min. 5 symbole').isLength({ min: 5 }),
]
    
export { registerValidator, loginValidator }