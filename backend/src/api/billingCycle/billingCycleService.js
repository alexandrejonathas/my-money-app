const _ = require('lodash')
const BillingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')

var ObjectId = require('mongodb').ObjectID;

//BillingCycle.methods(['get', 'post', 'put', 'delete'])
//BillingCycle.updateOptions({ new: true, runValidators: true })

//Aplicando o midleware para exibir os erros nos metodos post e put 
/*BillingCycle.after('post', errorHandler)
    .after('put', errorHandler)
*/

const sendErrorsFromDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).json({errors})
}

//Criado por mim
const getCycles = (req, res, next) => {
    /* 596cdc1e360d273c03626c71 */
    BillingCycle.find({"user_id": ObjectId(req.params.user_id)}, (error, value) => {
        if(error){
            return res.status(500).json({errors: [error]})
        }else{
            return res.json(value)
        }
    })
}

const saveCycle = (req, res, next) => {
    const cycle_id = req.params.id || ''
    if(cycle_id)
        updateCycle(req, res, next)
    else
        createCycle(req, res, next)

}

const createCycle = (req, res, next) => {
    const cycle = new BillingCycle(req.body)
    console.log(cycle)
    cycle.save(err => {
        if(err){
            return sendErrorsFromDB(res, err)
        }else{
            return res.json(cycle)
        }
    })
}

const updateCycle = (req, res, next) => {
    const c = new BillingCycle(req.body)
    BillingCycle.findById(req.params.id, function(err, cycle){
        if(err){
            console.log(err)
            return sendErrorsFromDB(res, err)
        }
        else{
            cycle.name = c.name
            cycle.month = c.month
            cycle.year = c.year
            cycle.credits = c.credits
            cycle.debts = c.debts

            cycle.save(err => {
                if(err){
                    console.log(err)
                    return sendErrorsFromDB(res, err)
                }
                else
                    return res.json(c)
            })
        }
    })

}

const deleteCycle = (req, res, next) => {      
    BillingCycle.findByIdAndRemove(req.params.id, function(err, cycle){
        if(err){
            return sendErrorsFromDB(res, err)
        }
        else{
            return res.json(cycle)            
        }
    })
}

const count = (req, res, next) => {
    BillingCycle.count((error, value) => {
        if(error){
            res.status(500).json({errors: [error]})
        }else{
            res.json({value})
        }
    })
}

const summary = (req, res, next) => {
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
}

module.exports = { getCycles, saveCycle, deleteCycle, summary, count }