import React from 'react'
import PropTypes from 'prop-types'
import {fetchPopularRepos} from '../utils/api'

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
        
        this.state = ({
            selected_language: 'All',
            repos: {},
            error: null
        })

        this.updateLanguage = this.updateLanguage.bind(this);
        this.isLoading = this.isLoading.bind(this);

    }

    componentDidMount(){
        this.updateLanguage(this.state.selected_language);
    }

    updateLanguage(selected_language) {
        this.setState({
            selected_language,
            error: null
        })

        //fetch the repository information only if it hasn't been previously
        if(!this.state.repos[selected_language]) {

            fetchPopularRepos(selected_language)
            .then((data)=> {
                this.setState(({repos}) => ({
                    repos: {
                        ...repos,
                        [selected_language]: data
                    }
                }))
            })
            .catch(() => {
                console.warn('Error fetching repos: ', error)
        
                this.setState({
                    error: `There was an error fetching the repositories.`
                })
            })
        }
    }

    // Derive 'loading' state
    isLoading(){
        const {selected_language, error, repos} = this.state;
        return !repos[selected_language] && (error === null);
    }

    render(){
        
        const {selected_language, error, repos} = this.state;

        return (
            <React.Fragment>
                
                <LanguagesNavigation
                    selected={selected_language}
                    onUpdateLanguage={this.updateLanguage}
                />

                {this.isLoading() && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {repos[selected_language] && <pre>{JSON.stringify(repos[selected_language], null, 2)}</pre>}

            </React.Fragment>
        )
    }
}