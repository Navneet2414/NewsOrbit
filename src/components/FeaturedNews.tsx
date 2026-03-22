import React from 'react'
import NewsCard from './NewsCard'
import './FeaturedNews.css'

const FeaturedNews: React.FC = () => {
  const newsItems = [
    {
      title: 'Breaking: Major Tech Announcement',
      summary: 'A leading tech company has unveiled its latest innovation that promises to revolutionize the industry.',
      image: 'https://via.placeholder.com/400x200/4CAF50/FFFFFF?text=Tech+News',
      date: 'March 22, 2026'
    },
    {
      title: 'Global Climate Summit Concludes',
      summary: 'World leaders reach historic agreement on climate action during the annual summit.',
      image: 'https://via.placeholder.com/400x200/2196F3/FFFFFF?text=Climate+News',
      date: 'March 21, 2026'
    },
    {
      title: 'Sports Championship Finals',
      summary: 'Exciting matches and unexpected upsets mark the conclusion of this year\'s championship.',
      image: 'https://via.placeholder.com/400x200/FF9800/FFFFFF?text=Sports+News',
      date: 'March 20, 2026'
    }
  ]

  return (
    <section className="featured-news">
      <div className="container">
        <h2>Featured News</h2>
        <div className="news-grid">
          {newsItems.map((item, index) => (
            <NewsCard
              key={index}
              title={item.title}
              summary={item.summary}
              image={item.image}
              date={item.date}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedNews