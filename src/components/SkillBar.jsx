import React from 'react'
import { motion } from 'framer-motion'

const SkillBar = ({ skill, index, inView }) => {
  return (
    <div className="skill-item">
      <div className="skill-header">
        <span className="skill-icon">{skill.icon}</span>
        <span className="skill-name">{skill.name}</span>
        <span className="skill-percentage">{skill.level}%</span>
      </div>
      <div className="skill-bar-container">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: index * 0.1, ease: 'easeOut' }}
          style={{
            background: `linear-gradient(90deg, var(--primary-color), var(--secondary-color))`,
            boxShadow: `0 0 20px rgba(0, 212, 255, 0.5)`
          }}
        />
      </div>
    </div>
  )
}

export default SkillBar

