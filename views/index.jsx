import React from 'react'
import MainLayout from './layouts/main.jsx'

var IndexComponent = React.createClass({
    componentDidMount(){
        console.log('mounting')
    },
    render() {
        return(
            <MainLayout title={this.props.title}>
                <div>
                    <h1>React component</h1>
                </div>
            </MainLayout>
        )
    }
})

export default IndexComponent;
