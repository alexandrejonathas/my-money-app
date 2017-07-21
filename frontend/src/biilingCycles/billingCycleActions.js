import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'
import consts from '../consts'

const BASE_URL = consts.API_URL

const user = JSON.parse(localStorage.getItem(consts.userKey))
const INITIAL_VALUES = {credits: [{}], debts: [{}], user_id: user ? user._id : ''}

export function getList(){
    const request = axios.get(`${BASE_URL}/billingCycles/cycles/${user._id}`)
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    }
}

function submit(values, method){
    return dispatch => {
        const id = values._id || ''
        axios[method](`${BASE_URL}/billingCycles/cycles/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso!')
                //Pra pasar um array para o dispatch é necessário o midleware redux-multi
                dispatch(init())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Error', error));
            })
    }        
}

export function create(values){
    return submit(values, 'post')
}

export function showTab(billingCycle, tabId){
    return [
        showTabs(tabId),
        selectTab(tabId),
        initialize('billingCycleForm', billingCycle)
    ]
}

export function update(values){
    return submit(values, 'put')
}

export function remove(values){
    return submit(values, 'delete')
}

export function init(){
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('billingCycleForm', INITIAL_VALUES)
    ]
}