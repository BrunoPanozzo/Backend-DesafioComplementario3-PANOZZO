class SessionsServices {
    
    constructor(dao) {
        this.dao = dao
    }    

    async validarPasswordsRepetidos(email, password) {
        return await this.dao.validarPasswordsRepetidos(email, password)
    }

    async changeRole(userId) {
        return await this.dao.changeRole(userId)
    }
    
    async getUserById(userId)   {
        return await this.dao.getUserById(userId)
    }
    
    async getUserByEmail(email)   {
        return await this.dao.getUserByEmail(email)
    }
    
    async getUserByCartId(cartId)   {
        return await this.dao.getUserByCartId(cartId)
    }
}

module.exports = SessionsServices