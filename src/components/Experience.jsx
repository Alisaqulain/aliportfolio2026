import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import './Experience.css'

const Experience = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const experiences = [
    {
      company: 'Freelance Full-Stack Developer',
      role: 'Full-Stack Web & App Developer',
      period: '2020 - Present',
      description: 'Developing scalable web applications and mobile apps for clients worldwide. Specializing in React, Node.js, and cloud technologies.',
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Flutter'],
      logo: '💼'
    },
    {
      company: 'Various Projects',
      role: 'Lead Developer',
      period: '2021 - Present',
      description: 'Led development of multiple high-traffic applications including e-commerce platforms, real-time communication apps, and fintech solutions.',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker'],
      logo: '🚀'
    },
    {
      company: 'Open Source Contributor',
      role: 'Contributor',
      period: '2020 - Present',
      description: 'Active contributor to open-source projects, focusing on improving developer experience and building reusable components.',
      technologies: ['React', 'TypeScript', 'Git'],
      logo: '🌐'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  return (
    <section id="experience" className="experience-section" ref={ref}>
      <div className="experience-container">
        <motion.div
          className="experience-header"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            <span className="title-number">02.</span>
            Experience
          </h2>
          <div className="title-underline"></div>
        </motion.div>

        <motion.div
          className="timeline-container"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="timeline-line"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="timeline-marker">
                <div className="marker-icon">{exp.logo}</div>
                <div className="marker-pulse"></div>
              </div>

              <motion.div
                className="timeline-content"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 + 0.3 }}
              >
                <div className="experience-card">
                  <div className="experience-header-card">
                    <div className="company-logo">{exp.logo}</div>
                    <div>
                      <h3 className="company-name">{exp.company}</h3>
                      <h4 className="role-name">{exp.role}</h4>
                    </div>
                  </div>

                  <div className="experience-period">
                    <FaCalendarAlt className="period-icon" />
                    <span>{exp.period}</span>
                  </div>

                  <p className="experience-description">{exp.description}</p>

                  <div className="technologies">
                    {exp.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="tech-tag"
                        whileHover={{ scale: 1.1, y: -2 }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: index * 0.2 + techIndex * 0.1 + 0.5 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
