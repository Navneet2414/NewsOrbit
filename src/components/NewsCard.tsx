import React from 'react'
import './NewsCard.css'

interface NewsCardProps {
  title: string
  summary: string
  image: string
  date: string
}

const NewsCard: React.FC<NewsCardProps> = ({ title, summary, image, date }) => {
  return (
    <div className="news-card">
      <img src={image} alt={title} className="news-image" />
      <div className="news-content">
        <h3>{title}</h3>
        <p>{summary}</p>
        <span className="news-date">{date}</span>
      </div>
    </div>
  )
}

export default NewsCard