import React, { Component } from 'react'

class Home extends Component {
  constructor() {
    super()

    this.state = {
      things: []
    }
  }
  
  componentWillMount() {
    fetch('http://localhost:3001/api/things')
      .then(resp => resp.json())
      .then(data => this.setState({ things: data }))
  }

  render() {
    const displayData = this.state.things.map(thing => {
      <div className="athing">
        <h1>{thing.title}</h1>
        <a href="{thing.url}">{thing.title}</a>
        <p>{thing.points}</p>
      </div>
    })

    return (
      <div>
        {displayData}
      </div>
    )
  }
}

export default Home