import React from 'react'

const Story = ({ title, url, by, formatDate, score, descendants }) =>
    <div
      className="story"
      style={{
        backgroundColor: '#ff6600',
        borderRadius: '3px',
        margin: '5px',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <a href={url}><h3>{title}</h3></a>
        <p>By: {by} at {formatDate}</p>
        <p>Score: {score}</p>
        <p>{descendants} Comments</p>
    </div>

  export default Story