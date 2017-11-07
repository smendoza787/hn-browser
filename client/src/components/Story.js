import React from 'react'
import { Link } from 'react-router-dom'

const Story = ({ story, formatDate }) =>
	<div className="story">
		<p>ID: {story.id}</p>
		<a href={story.url}><h3>{story.title}</h3></a>
		<p>By: {story.by} at {formatDate}</p>
		<p>Score: {story.score}</p>
		<Link to={`${story.id}`}>
			{story.descendants} Comments
		</Link>
	</div>

  export default Story