const BillingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')

var ObjectId = require('mongodb').ObjectID;

BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({ new: true, runValidators: true })

//Aplicando o midleware para exibir os erros nos metodos post e put 
BillingCycle.after('post', errorHandler)
    .after('put', errorHandler)


BillingCycle.route('count', (req, res, next) => {
    BillingCycle.count((error, value) => {
        if(error){
            res.status(500).json({errors: [error]})
        }else{
            res.json({value})
        }
    })
})

BillingCycle.route('summary', (req, res, next) => {
    BillingCycle.aggregate({
        $project: { credit: { $sum: "$credits.value" }, debt: { $sum: "$debts.value" } }
    }, 
    {
        $group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debt" }}
    }, 
    {
        $project: { _id: 0, credit: 1, debt: 1 }
    }, 
    (error, result) => {
        if(error){
            res.status(500).json({errors: [error]})
        }else{
            res.json(result[0] || {credit: 0, debt: 0})
        }        
    })
})

//Criado por mim
BillingCycle.route('/cycles/:user_id', (req, res, next) => {
    console.log(req.params.user_id)
    BillingCycle.find({"user_id": ObjectId("596cdc1e360d273c03626c71")}, (error, value) => {
        if(error){
            res.status(500).json({errors: [error]})
        }else{
            res.json({value})
        }
    })
})

module.exports = BillingCycle