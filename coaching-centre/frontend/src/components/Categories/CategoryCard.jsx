import React from 'react'
import "./CategoryCard.css"
    
const CategoryCard = ({category}) => {
  return (
    <div className='category-card'>
        <div className="category-icon">
            {category.icon}
        </div>
        <h3>{category.title}</h3>
        <p>{category.courses}</p>
        <button>Explore</button>
      
    </div>
  )
}

export default CategoryCard
