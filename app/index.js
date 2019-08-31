// Core Imports
import React from 'react'
import ReactDOM from 'react-dom'

// Style Imports
import './index.css'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <h1>Github Popular Repositories</h1>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)