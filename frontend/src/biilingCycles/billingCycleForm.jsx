import React, {Component} from 'react'

import { bindActionCreators } from 'redux' 
import { connect } from 'react-redux'

import {reduxForm, Field, formValueSelector} from 'redux-form'

import { init } from './billingCycleActions'
import LabelAndInput from '../common/form/labelAndInput'
import ItemList from './itemList'
import Summary from './summary'


class BillingCycleForm extends Component{
    
    calculateSummary(){
        const sum = (t, v) => t + v
        return {
            sumOfCredits: this.props.credits.map(c => +c.value || 0).reduce(sum),
            sumOfDebts: this.props.debts.map(d => +d.value || 0).reduce(sum)
        }
    }

    render(){
        const { handleSubmit, readOnly, credits, debts } = this.props
        const {sumOfCredits, sumOfDebts} = this.calculateSummary()

        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='name' component={LabelAndInput}
                        readOnly={readOnly}
                        label='Nome' cols='12 4' placeholder='Informe o nome' />
                    <Field name='month' component={LabelAndInput}
                        readOnly={readOnly}
                        label='Mês' type='number' cols='12 4' placeholder='Informe o mês' />
                    <Field name='year' component={LabelAndInput} 
                        readOnly={readOnly}
                        label='Ano' type='number' cols='12 4' placeholder='Informe o ano' />
                    <Field name='user_id' component={LabelAndInput}
                        type='hidden' cols='12 4' />                        
                    <Summary credit={sumOfCredits} debt={sumOfDebts} />    
                    <ItemList cols='12 6' list={credits} readOnly={readOnly} 
                        field='credits' legend='Créditos'/>
                    <ItemList cols='12 6' list={debts} readOnly={readOnly} 
                        field='debts' legend='Débitos' showStatus={true}/>                        
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default' onClick={this.props.init} >Cancelar</button>
                </div>
            </form>
        )
    }
}

const formID = 'billingCycleForm'

BillingCycleForm = reduxForm({form: formID, destroyOnUnmount: false})(BillingCycleForm)

const selector = formValueSelector(formID)

const mapStateToProps = state => ({
    credits: selector(state, 'credits'),
    debts: selector(state, 'debts')
})

const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm) 