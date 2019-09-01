// Core Imports
import React from 'react'
import ReactDOM from 'react-dom'




export default class Popular extends React.Component {
    
    constructor(props){
        super(props)
        
        this.state = {
            selected_language: 'All',

        }
        this.selected_language = this.updateSelectedLanguage.bind(this);
    }

    updateSelectedLanguage(selected_language) {
        this.setState({
            selected_language
        })
    }

    render(){

        const languages = ['All', 'Javascript', 'Python', 'Ruby', 'Java'];

        return(
            <React.Fragment>
                <ul className="flex-center" >
                    {languages.map((language) => (
                        <li key={language}>
                            <button 
                            onClick={() => this.updateSelectedLanguage(language)}
                            style={language === this.state.selected_language ? {backgroundColor: '#111', color: '#fff'} : null}
                            className="nav-link" 
                            >
                                {language}
                            </button>
                        </li>
                    ))}
                </ul>
            </React.Fragment>
        )
    }

}