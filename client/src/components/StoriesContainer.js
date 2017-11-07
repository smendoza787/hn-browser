import React, { Component } from 'react'
import  { BrowserRouter as Router, Route } from 'react-router-dom'
import Story from './Story'
import StoryPage from './StoryPage'
import handleTimestamp from '../helpers/handleTimestamp'

class StoriesContainer extends Component {
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
    }
  }

  render() {
    const renderStories = this.state.storyObjects.map(thing => {
      return <Story
               story={thing}
               formatDate={handleTimestamp(thing.time)} />
    })

    return (
      <Router>
        <div>
          <Route path="/:id" component={StoryPage} />
          <Route exact path="/" render={() => (
            <div className="stories-container">
              {renderStories}
            </div>
          )}/>
        </div>
      </Router>
    )
  }
}

export default StoriesContainer