import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        bodyen: '',
        author: 'Max',
        submited: false
    }

    postDataHandler = () => {
        // const data = {
        //     title: this.state.title,
        //     body: this.state.body,
        //     author: this.state.author
        // };
        fetch('https://jsonplaceholder.typicode.com/posts',{
            method: 'POST', 
            body: JSON.stringify({title: this.state.title, body: this.state.body, author: this.state.author})})
        .then(resp => resp.json())
        .then(resp => 
            console.log(resp))
            //this.setState({submited: true});  renderowanie warunkowe, alternatywne do history
            this.props.history.replace('/posts');
    }

    render () {
        let redirected = null;
        if (this.state.submited) {
            redirected = <Redirect to='/posts'/>
        }
        return (
            <div className="NewPost">
                {redirected}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;