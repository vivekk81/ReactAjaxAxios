import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axiosinstance from '../../axios'

class Blog extends Component {
    state = {
        posts : [],
        selectedPostId: ''
    }
    componentDidMount () {
        axiosinstance.get('/posts').then(res=>{
            const posts = res.data.slice(0, 4)
            const updatedPosts = posts.map(post=>{
                return {
                    ...post,
                    author: 'vivek'
                }
            })
            this.setState({posts: updatedPosts})
            //console.log(res)
        })
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id})
    }

    render () {
        const posts = this.state.posts.map(post=>{
            return <Post
                key={post.id}
                title={post.title}
                author={post.author}
                clicked={e=>this.postSelectedHandler(post.id)}
                />
        })
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;