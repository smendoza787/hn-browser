import React from 'react'

const Story = ({ title, text, url, type, by, formatDate, score, descendants }) =>
    <div>
      <a href={url}><h3>{title}</h3></a>
      <p>Type: {type}</p>
      <p>By: {by} at {formatDate}</p>
      <p>Score: {score}</p>
      <p>Text: {text}</p>
      <p>{descendants} Comments</p>
    </div>

  export default Story