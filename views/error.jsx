import React from 'react'

var ErrorComponent = React.createClass({
    render() {
        return(
            <div>
                <h1>Error</h1>
                <p>{this.props.message}</p>
            </div>
        )
    }
})

export default ErrorComponent;
