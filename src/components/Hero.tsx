import React from 'react'
import './Hero.css'

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <h2>Welcome to NewsOrbit</h2>
        <p>Your gateway to the latest news and updates from around the world.</p>
        <button className="cta-button">Explore News</button>
      </div>
    </section>
  )
}

export default Hero