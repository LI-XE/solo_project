import React, { Component } from 'react'
import Tab from '../components/Tab'
import TabNav from '../components/TabNav'
import Layout from './Layout';
import Event from '../components/Event';
import Home from '../components/Home';

class Nav extends Component {
    constructor(props){
        super(props);
        this.state={
          selected: 'Event'
        }
      }
      setSelected = (tab) => {
        this.setState({ selected : tab })
      }
    render() {
        return (
            <div className=" mt-1 px-5">
                    <TabNav tabs={['Home', 'Event', 'Menu']} selected={ this.state.selected } setSelected={ this.setSelected }>
                    <Tab isSelected={ this.state.selected === 'Home' } >
                        <Home />
                    </Tab>
                    <Tab isSelected={ this.state.selected === 'Event' }>
                        <Event />
                    </Tab>
                    <Tab isSelected={ this.state.selected === 'Menu' }>
                        <Layout />
                    </Tab>
                </TabNav>
            </div>
            

        )
    }
}

export default Nav;