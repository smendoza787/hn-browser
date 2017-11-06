import React, { Component } from 'react'
import Story from './Story'
import handleTimestamp from '../helpers/handleTimestamp'

class StoryContainer extends Component {
  constructor() {
    super()

    this.state = {
      urls: [],
      displayLinks: [],
      storyObjects: []
    }
  }

  getContent(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => this.setState({ storyObjects: this.state.storyObjects.concat(data)}))
  }

  componentDidMount() {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(resp => resp.json())
      .then(data => {
        const urlData = data.slice(0, 30).map(id => `https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        this.setState({ urls: urlData })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.urls !== this.state.urls) {
      Promise
        .all(this.state.urls.map(url => this.getContent(url)))
        .then(console.log('IS ALL DUN', this.state.storyObjects))
    }
  }

  render() {
    const renderStories = this.state.storyObjects.map(thing => {
      return <Story
               title={thing.title}
               text={thing.text}
               url={thing.url}
               type={thing.type}
               by={thing.by}
               formatDate={handleTimestamp(thing.time)}
               score={thing.score}
               descendants={thing.descendants} />
    })

    return (
      <div className="story-container">
        {renderStories}
      </div>
    )
  }
}

export default StoryContainer