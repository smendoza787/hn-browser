import React, { Component } from 'react'
import Comment from './Comment'
import PropTypes from 'prop-types'

class CommentsContainer extends Component {
  render() {
    const renderComments = this.props.comments.map(comment => (
      <Comment comment={comment} />
    ))
    return (
      <div className="comments-container">
        <h1>Comments for {this.props.story.title}</h1>
        {renderComments}
      </div>
    )
  }
}

CommentsContainer.propTypes = {
  comments: PropTypes.array,
  story: PropTypes.object
}

export default CommentsContainer