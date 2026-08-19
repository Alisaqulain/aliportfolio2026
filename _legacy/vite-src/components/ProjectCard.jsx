import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const ProjectCard = ({ project, index, inView }) => {
  const [isHovered, setIsHovered] = useState(false)

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut'
      }
    }
  }

  return (
    <motion.div
      className="project-card-wrapper"
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="project-card"
        whileHover={{ 
          scale: 1.05, 
          rotateY: 5,
          rotateX: 5,
          z: 50
        }}
        transition={{ type: 'spring', stiffness: 300 }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        <div className="card-glow-effect" style={{ '--project-color': project.color }}></div>
        
        <div className="project-image">
          <div 
            className="project-icon"
            style={{ 
              backgroundColor: `${project.color}20`,
              color: project.color
            }}
          >
            {project.image}
          </div>
        </div>

        <div className="project-content">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>

          <div className="project-tech">
            {project.tech.map((tech, techIndex) => (
              <motion.span
                key={techIndex}
                className="tech-badge"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + techIndex * 0.05 + 0.3 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <div className="project-links">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub />
              <span>GitHub</span>
            </motion.a>
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaExternalLinkAlt />
              <span>Live Demo</span>
            </motion.a>
          </div>
        </div>

        <motion.div
          className="card-3d-effect"
          animate={{
            rotateY: isHovered ? 10 : 0,
            rotateX: isHovered ? -5 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default ProjectCard



