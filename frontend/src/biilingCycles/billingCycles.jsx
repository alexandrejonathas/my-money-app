import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'

import Tabs from '../common/tab/tabs'
import TabsHeader from '../common/tab/tabsHeader'
import TabsContent from '../common/tab/tabsContent'

import TabHeader from '../common/tab/tabHeader'
import TabContent from '../common/tab/tabContent'

import { selectTab, showTabs } from '../common/tab/tabActions'
import { init, create, update, remove } from './billingCycleActions'

import BillingCycleList from './billingCycleList'
import BillingCycleForm from './billingCycleForm'

class BillingCycle extends Component{
    
    componentWillMount(){
        this.props.init()
    }

    render(){
        return (
            <div>   
                <ContentHeader title='Ciclos de pagamentos' small='Cadastro' />
                <Content>
                    <Tabs>  
                        <TabsHeader>
                            <TabHeader target='tabList' icon='bars' label='Listar' />
                            <TabHeader target='tabCreate' icon='plus' label='Incluir' />
                            <TabHeader target='tabUpdate' icon='pencil' label='Alterar' />
                            <TabHeader target='tabDelete' icon='trash-o' label='Deletar' />
                        </TabsHeader>
                        <TabsContent>
                            <TabContent  id='tabList'>
                                <BillingCycleList />
                            </TabContent>
                            <TabContent  id='tabCreate'>
                                <BillingCycleForm onSubmit={ this.props.create }
                                    submitLabel='Inluir' submitClass='primary' />
                            </TabContent> 
                            <TabContent  id='tabUpdate'>
                                <BillingCycleForm onSubmit={ this.props.update }
                                    submitLabel='Alterar' submitClass='info' />
                            </TabContent> 
                            <TabContent  id='tabDelete'>
                                <BillingCycleForm readOnly={true} onSubmit={ this.props.remove }
                                    submitLabel='Excluir' submitClass='danger' />
                            </TabContent>                                                                                          
                        </TabsContent>
                    </Tabs>
                </Content>
            </div>
        )
    }
}

const mapStateToProps = state => ({ tab: state.tab })
const mapDispatchToProps = dispatch => bindActionCreators({ 
    selectTab, showTabs, create, update, remove, init 
}, dispatch)
export default connect(null, mapDispatchToProps) (BillingCycle)