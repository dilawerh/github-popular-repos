// Core Imports
import React from 'react'
import PropTypes from 'prop-types'

// Navig
function LanguagesNavigation ({ selected, onUpdateLanguage}) {
    
    const languages = ['All', 'Javascript', 'Python', 'Ruby', 'Java'];

    return(
        <ul className="flex-center" >
            {languages.map((language) => (
                <li key={language}>
                    <button 
                    style={language === selected ? {backgroundColor: '#111', color: '#fff'} : null}
                    onClick={() => onUpdateLanguage(language)}
                    className="nav-link" 
                    >
                        {language}
                    </button>
                </li>
            ))}
        </ul>
    )

} 

LanguagesNavigation.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

export default class Popular extends React.Component {
    
    constructor(props){
        super(props)
        
        this.state = {
            selected_language: 'All',

        }
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(selected_language) {
        this.setState({
            selected_language
        })
    }

    render(){
        
        const {selected_language} = this.state;
    
        return (
            <React.Fragment>
                <LanguagesNavigation
                    selected={selected_language}
                    onUpdateLanguage={this.updateLanguage}
                />
            </React.Fragment>
        )

    }

}