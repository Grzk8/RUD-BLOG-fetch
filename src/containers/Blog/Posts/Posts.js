import React, {Component} from 'react';
import Post from '../../../components/Post/Post';
import {Link, Route} from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

import './Posts.css';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount () {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then (resp => {
            const posts = resp.slice(0, 4);
            const updatedPosts = posts.map(post =>{
                return{
                    ...post,
                    author: 'Max'
                }
            })
            this.setState({posts: updatedPosts})
        })
        .catch(error => {
            console.log(error);
           // this.setState({error: true})
        })
    }

    postSelectedHandler = (id) => {
        this.props.history.push({pathname: '/posts/' + id});
        //this.props.history.push('/posts/' + id); to samo
    }

    render () {
        let posts = <p style={{textAlign: 'center', color: 'red'}}>Something went wrong</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                <Link to={'/posts/' + post.id} key={post.id}>
                    <Post
                    title={post.title} 
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)}/>
                    </Link>)
            }
        )
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost}/>
            </div>

        );
    }
};

export default Posts;