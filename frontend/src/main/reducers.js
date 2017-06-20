import { combineReducers } from 'redux'

import DashboardReducer from '../dashboard/dashboardReducer'
import TabReducer from '../common/tab/tabReducer'

const rootReducers = combineReducers({
    dashboard: DashboardReducer,
    tab: TabReducer
})

export default rootReducers