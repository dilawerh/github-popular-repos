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

function ReposGrid({repos}) {
    return(
        <ul className="repo_grid" >
            {repos.map((repo, index)=>{
                const {name, owner, html_url, stargazers_count, forks, open_issues} = repo
                const {login, avatar_url} = owner
            
            return(
                <li key={index} className="single_repo" >
                    
                    <div className="single_repo--container">
                        
                        <img src={avatar_url} className="single_repo--image"></img>
                        
                        <div className="single_repo--repoInfo">
                            <h4 className="single_repo--heading">#{index+1} {name} </h4>
                            <div className="single_repo--link"> 
                                By <a target="_blank" href={login}>{login}</a>
                            </div>
                        </div>
                        
                    </div>
                    
                </li>
            )
            })}
        </ul>
    )
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

export default class Popular extends React.Component {
    
    constructor(props){
        
        super(props)
        
        this.state = ({
            selected_language: 'All',
            repos: [],
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
                <LanguagesNavigation selected={selected_language} onUpdateLanguage={this.updateLanguage}/>
                {this.isLoading() && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {repos[selected_language] && <ReposGrid repos={repos[selected_language]} />}
            </React.Fragment>
        )
    }
}