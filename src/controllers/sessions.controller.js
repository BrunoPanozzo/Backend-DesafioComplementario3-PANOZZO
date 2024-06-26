const { UserDTO } = require("../dao/dto/user.dto")
const { CustomError } = require("../services/errors/CustomError")
const { ErrorCodes } = require("../services/errors/errorCodes")
const { generateInvalidCredentialsError } = require("../services/users/errors")

class SessionsController {

    constructor() {
    }

    login(req, res) {
        const email = req.body.email        
        if (!req.user) {
            //return res.status(400).send({ status: 'error', error: 'Credenciales inválidas!' })
            //return res.sendUserError('Credenciales inválidas!')
            throw CustomError.createError({
                name: 'InvalidCredentials',
                cause: generateInvalidCredentialsError(email),
                message: 'Error trying to login a user',
                code: ErrorCodes.INVALID_CREDENTIALS
            })
        }
        req.session.user = new UserDTO(req.user)

        // no es necesario validar el login aquí, ya lo hace passport!
        return res.redirect('/products')
    }

    failLogin(req, res) {
        //res.send({ status: 'error', message: 'Login erróneo!' })
        //res.sendUnauthorizedError('Login erróneo!')
        throw CustomError.createError({
            name: 'InvalidCredentials',
            cause: generateInvalidCredentialsError(email),
            message: 'Error trying to login a user',
            code: ErrorCodes.INVALID_CREDENTIALS
        })
    }

    resetPassword(req, res) {
        // console.log(req.user)
        res.redirect('/login')
    }

    failResetPassword(req, res) {
        //res.send({ status: 'error', message: 'No se pudo resetear la password!' })
        res.sendServerError('No se pudo resetear la password!')
    }

    register(req, res) {
        // console.log('usuario: ', req.user)
        // no es necesario registrar el usuario aquí, ya lo hacemos en la estrategia!
        res.redirect('/login')
    }

    failRegister(req, res) {
        //res.send({ status: 'error', message: 'Registración errónea.!' })
        res.sendServerError('Registración errónea.!')
    }

    githubCallback(req, res) {
        req.session.user = new UserDTO(req.user)

        // no es necesario validar el login aquí, ya lo hace passport!
        return res.redirect('/products')
    }

    googleCallback(req, res) {
        req.session.user = new UserDTO(req.user)

        // no es necesario validar el login aquí, ya lo hace passport!
        return res.redirect('/products')
    }

    logout(req, res) {
        req.session.destroy(_ => {
            res.redirect('/')
        })
    }

    current(req, res) {
        if (!req.user)
            //return res.status(400).send({ status: 'error', error: 'No existe un usuario logeado!' })
            //return res.sendUserError('No existe un usuario logeado!')
            throw CustomError.createError({
                name: 'UnauthorizedUser',
                cause: generateInvalidCredentialsError(email),
                message: 'User is not authorized',
                code: ErrorCodes.UNAUTHORIZED_ERROR
            })

        req.session.user = new UserDTO(req.user)

        // no es necesario validar el login aquí, ya lo hace passport!
        return res.redirect('/profile')
    }
}

module.exports = SessionsController