// Core Imports
import React from 'react'
import ReactDOM from 'react-dom'




export default class Popular extends React.Component {
    
    render(){

        const languages = ['All', 'Javascript', 'Python', 'Ruby', 'Java'];

        return(
            <React.Fragment>
                <ul className="flex-center" >
                    {languages.map((language) => (
                        <li key={language}>
                            <button className="nav-link" >
                                {language}
                            </button>
                        </li>
                    ))}
                </ul>
            </React.Fragment>
        )
    }
    
}