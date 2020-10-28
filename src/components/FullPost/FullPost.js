import React, { Component } from 'react';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null,
    }
    componentDidUpdate () {
        if (this.props.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                fetch('https://jsonplaceholder.typicode.com/posts/' +this.props.id)
                .then(response => response.json())
                .then(resp =>{
    
                    this.setState({loadedPost: resp})
                });
            }

 
        };
    };

    daleteDataHandler = () => {
        // const data = {
        //     title: this.state.title,
        //     body: this.state.body,
        //     author: this.state.author
        // };
        fetch('https://jsonplaceholder.typicode.com/posts',{
            method: 'DELETE', 
            body: JSON.stringify({title: this.state.title, body: this.state.body, author: this.state.author})})
        .then(resp => resp.json())
        .then(resp => 
            console.log(resp))
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.daleteDataHandler}>Delete</button>
                    </div>
                </div>
            );    
        }
        return post;
    }
}

export default FullPost;