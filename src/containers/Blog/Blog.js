import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import asyncComponent from '../../components/hoc/asyncComponent';
//import NewPost from './NewPost/NewPost';


// new post zostanie pobrany z serwera dopiero po wejściu w link new post routes-lazily, dane pobierane są wyedy gdy są potrzebne
const AsyncNewPost = asyncComponent(() => {
    return import ('./NewPost/NewPost');
});



class Blog extends Component {


    render () {
        return (
                <div className="Blog">
                    <header>
                        <nav>
                            <ul>
                                <li><NavLink to='/posts/' 
                                exact
                                activeClassName='my-active'
                                activeStyle={{
                                    color: '#fa921f',
                                    textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                                <li><NavLink to={{
                                    pathname: '/new-post',
                                    hash: '#submit',
                                    search: '?quick-submit=true'
                                }}>New Post</NavLink></li>
                            </ul>
                        </nav>
                    </header>
                    {/* <Route path="/" exact render={()=> <h1>Home</h1>} />
                    <Route path="/" render={()=> <h2>Home 2</h2>} /> */}
                    <Switch>
                        <Route path="/new-post" exact component={AsyncNewPost}/>
                        <Route path="/posts" component={Posts}/>
                    </Switch>

                </div>
        );
    }
}

export default Blog;