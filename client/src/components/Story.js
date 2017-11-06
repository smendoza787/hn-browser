import React from 'react'

const Story = ({ title, url, by, formatDate, score, descendants }) =>
    <div className="story">
        <a href={url}><h3>{title}</h3></a>
        <p>By: {by} at {formatDate}</p>
        <p>Score: {score}</p>
        <p>{descendants} Comments</p>
    </div>

  export default Story