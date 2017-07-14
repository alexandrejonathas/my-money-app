const express = require('express')
const auth = require('./auth')

module.exports = function(server){
    
    //Definir url base
    /*
    * Rotas protejidas por token JWT
    */
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    protectedApi.use(auth)

    //Rotas do ciclo de pagamento
    const BillingCycle = require('../api/billingCycle/billingCycleService')
    BillingCycle.register(protectedApi, '/billingCycles')

    /*
    * Rotas abertas
    */
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/authService')

    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signUp)
    openApi.post('/validate-token', AuthService.validateToken)    

}