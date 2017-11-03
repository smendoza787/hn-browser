import React, { Component } from 'react'

class Home extends Component {
  constructor() {
    super()

    this.state = {
      urls: [],
      displayLinks: [],
      thingObjects: []
    }
  }

  getContent(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => this.setState({ thingObjects: this.state.thingObjects.concat(data)}))
  }

  componentDidMount() {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(resp => resp.json())
      .then(data => {
        const urlData = data.slice(0, 20).map(id => `https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        this.setState({ urls: urlData })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.urls !== this.state.urls) {
      Promise
        .all(this.state.urls.map(url => this.getContent(url)))
        .then(console.log('IS ALL DUN', this.state.thingObjects))
    }
  }

  displayThing(thing) {
    // HANDLE TIMESTAMP
    const unixToDate = new Date(thing.time*1000)
      let hours = unixToDate.getHours(),
          minutes = unixToDate.getMinutes(),
          seconds = unixToDate.getSeconds(),
          suf = hours > 12 ? "PM" : "AM"

      // CONVERT TO STANDARD TIME
      if (hours > 12) {
        hours -= 12
        suf = "PM"
      }
      // PAD SINGLE DIGITS IF PRESENT
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      // PAD SINGLE DIGITS IF PRESENT
      if (seconds < 10) {
        seconds = '0' + seconds
      }

      const formatDate = `${hours}:${minutes}:${seconds}${suf}`
      
      
      return (
        <div key={thing.id}>
          <a href={thing.url}><h2>{thing.title}</h2></a>
          <p><strong>Type:</strong> {thing.type}</p>
          <p><strong>By:</strong> {thing.by} at {formatDate}</p>
          <p><strong>Score:</strong> {thing.score}</p>
          <p><strong>Text:</strong> {thing.text}</p>
          <p>{thing.descendants} Comments</p>
        </div>
      )
  }

  render() {
    const renderObjects = this.state.thingObjects.map(thing => this.displayThing(thing))

    return (
      <div>
        <ol>
          {renderObjects}
        </ol>
      </div>
    )
  }
}

export default Home