import React, { Component } from 'react'

class Tab extends React.Component {
    render(){

            if (this.props.isSelected){
                return(
                    <div className="tab selected_tab bg-light p-5">
                        { this.props.children }
                    </div>
                );
            }
        return null;
    }
}

export default Tab;
