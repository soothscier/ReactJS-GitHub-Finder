import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS} from '../Types';

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // set loading
    const setLoading = () =>  dispatch({type: SET_LOADING});

    // search users
    const searchUsers = async (text) => {
        setLoading();

        const REACT_APP_GITHUB_CLIENT_ID = '5c6cafaf9eac749c042c';
        const REACT_APP_GITHUB_CLIENT_SECRET = '6da1491d6d6052f1f41be69dba546413bdcaca73';
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`);
        
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })
    }

    // get user
    const getUser = async username => {
        setLoading();

        const REACT_APP_GITHUB_CLIENT_ID = '5c6cafaf9eac749c042c';
        const REACT_APP_GITHUB_CLIENT_SECRET = '6da1491d6d6052f1f41be69dba546413bdcaca73';

        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
        )

        dispatch({
            type: GET_USER,
            payload: res.data
        })
    }
    // get repos

    const getUserRepos = async username => {
        setLoading(true);
        const REACT_APP_GITHUB_CLIENT_ID = '5c6cafaf9eac749c042c';
        const REACT_APP_GITHUB_CLIENT_SECRET = '6da1491d6d6052f1f41be69dba546413bdcaca73';

        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
        )
        
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    }

    // clear users
    const clearUsers = () => dispatch({type: CLEAR_USERS});
    

    return <GithubContext.Provider 
                value={{
                        users: state.users, 
                        user: state.user, 
                        repos: state.repos, 
                        loading: state.loading,
                        searchUsers,
                        clearUsers,
                        getUser,
                        getUserRepos
                    }}> 
                    {props.children}
            </GithubContext.Provider>
}

export default GithubState;