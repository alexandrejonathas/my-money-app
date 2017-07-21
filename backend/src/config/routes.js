const express = require('express')
const auth = require('./auth')

module.exports = function(server){

    /*
    * Rotas protejidas por token JWT
    */
    const protectedApi = express.Router()
    server.use('/api/billingCycles', protectedApi)

    protectedApi.use(auth)

    //Rotas do ciclo de pagamento
    const BillingCycle = require('../api/billingCycle/billingCycleService')
    //BillingCycle.register(protectedApi, '/billingCycles')
    protectedApi.get('/cycles/:user_id', BillingCycle.getCycles)
    protectedApi.post('/cycles', BillingCycle.saveCycle)
    protectedApi.put('/cycles/:id', BillingCycle.saveCycle)
    protectedApi.delete('/cycles/:id', BillingCycle.deleteCycle)

    protectedApi.get('/summary', BillingCycle.summary)
    protectedApi.get('/count', BillingCycle.count)

    /*
    * Rotas abertas
    */
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/authService')

    openApi.post('/login', AuthService.login)
    openApi.post('/sign-up', AuthService.signUp)
    openApi.post('/validate-token', AuthService.validateToken)    

}