import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class Comment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      kids: [],
    }
  }
  
  getContent(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => this.setState({ kids: this.state.kids.concat(data)}))
  }

  componentDidMount() {
    if (this.props.comment.kids) {
      Promise
        .all(this.props.comment.kids.map(id => this.getContent(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)))  
    }
  }

  render() {
    if (this.state.kids.length > 0) {
      const renderChildren = this.state.kids.map(comment => <Comment comment={comment} styling={{ position: 'relative', left: '15px' }} />) 
      return (
        <div>
          <div className="comment" style={this.props.styling}>
            <p><strong>{this.props.comment.by}</strong> {moment.unix(this.props.comment.time).fromNow()}</p>
            <p>{this.props.comment.text}</p>
          </div>
          <div className="comment-children" style={this.props.styling}>
            {renderChildren}
          </div>    
        </div>
      )
    } else {
      return (
        <div className="comment">
          <p><strong>{this.props.comment.by}</strong> {moment.unix(this.props.comment.time).fromNow()}</p>
          <p>{this.props.comment.text}</p>
        </div>
      )
    }
  }
}

Comment.propTypes = {
  comment: PropTypes.object,
  kids: PropTypes.array
}

export default Comment