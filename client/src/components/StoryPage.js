import React, { Component } from 'react'
import Story from './Story'
import CommentsContainer from './CommentsContainer'
import handleTimestamp from '../helpers/handleTimestamp'
import { Link } from 'react-router-dom'

class StoryPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      story: {},
      comments: []
    }
  }
  
  componentDidMount() {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props.match.params.id}.json`)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ story: data })
      })
  }
  
  render() {
    return (
      <div>
        <Link to="/">Back to home</Link>
        <Story story={this.state.story} formatDate={handleTimestamp(this.state.story.time)}/>
        <CommentsContainer story={this.state.story} />
      </div>
    )
  }
}

export default StoryPage