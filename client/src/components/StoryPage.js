import React, { Component } from 'react'
import Story from './Story'
import CommentsContainer from './CommentsContainer'
import { Link } from 'react-router-dom'
import moment from 'moment'

class StoryPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      story: {},
      commentUrls: [],
      commentObjects: []
    }
  }

  getContent(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => this.setState({ commentObjects: this.state.commentObjects.concat(data)}))
  }
  
  componentDidMount() {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props.match.params.id}.json`)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          story: data,
          commentUrls: data.kids.map(id => `https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        })
      })
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.story !== this.state.story) {
      Promise
        .all(this.state.commentUrls.map(url => this.getContent(url)))
    }
  }

  render() {
    return (
      <div>
        <Link to="/">Back to home</Link>
        <Story story={this.state.story} formatDate={moment.unix(this.state.story.time).fromNow()}/>
        <CommentsContainer story={this.state.story} comments={this.state.commentObjects} />
      </div>
    )
  }
}

export default StoryPage