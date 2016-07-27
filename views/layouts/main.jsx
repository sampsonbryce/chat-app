import React from 'react'

var MainLayout = React.createClass({
    componentDidMount(){
        console.log('did mount');
        var socket = io("http://localhost:8080");
    },
    render(){
        return(
            <html>
                <head>
                    <title>{this.props.title}</title>
                </head>
                <body>
                    {this.props.children}

                    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.8/socket.io.js"></script>
                </body>
            </html>
        )
    }
})

export default MainLayout;
