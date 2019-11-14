import React from 'react'
import Enzyme, { shallow,mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Dashboard from './components/dashboard'
Enzyme.configure({ adapter: new Adapter() })

describe("checking component",()=>{
    let component = mount(<Dashboard/>)

    it("Checking the presence of whole component",()=>{
        component.debug() // passes only when the component exists
        console.log("\n\n\ttest result--> ",component.debug())
    })
})