import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaBriefcase, FaCalendarAlt, FaCode, FaUsers, FaGraduationCap } from 'react-icons/fa'
import './Experience.css'

const Experience = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const experiences = [
    {
      company: 'Bizsun Creative',
      role: 'Full-Stack Developer',
      period: 'December 2024 – Present',
      location: 'Remote',
      description: [
        'Working on client-based web and mobile application projects.',
        'Developing scalable solutions using Next.js, React, Node.js, MongoDB, and Supabase.',
        'Collaborating with design and marketing teams to deliver high-performance, SEO-optimized products.',
        'Handling end-to-end development, from requirement analysis to deployment.'
      ],
      technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Supabase', 'React Native'],
      logo: '💼',
      type: 'work'
    },
    {
      company: 'Genex Corporate Services',
      role: 'Full-Stack Developer Intern (Full-Time)',
      period: 'March 2024 – November 2024',
      location: 'Remote',
      description: [
        'Developed GenBore and Vorksinta company websites using React.js as solo projects.',
        'Contributed to the Internsta platform (Internshala-like system), initially built with Next.js, later migrated to Django.',
        'Worked on frontend, backend, APIs, and deployment-ready features in a collaborative environment.'
      ],
      technologies: ['React.js', 'Next.js', 'Django', 'Python', 'Node.js', 'Express'],
      logo: '🚀',
      type: 'work'
    },
    {
      company: 'Yash Computer Education Center',
      role: 'Computer Programming Instructor',
      period: 'August 2023 – Present',
      location: 'Muzaffarnagar (U.P)',
      description: [
        'Instructed students in programming languages, including HTML5, CSS3, JavaScript, C and C++.',
        'Designed and conducted hands-on coding exercises and project-based learning sessions.',
        'Provided guidance in debugging and improving coding skills to enhance problem-solving abilities.'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'C', 'C++'],
      logo: '🎓',
      type: 'work'
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
            Work Experience
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
                      <p className="location">{exp.location}</p>
                    </div>
                  </div>

                  <div className="experience-period">
                    <FaCalendarAlt className="period-icon" />
                    <span>{exp.period}</span>
                  </div>

                  <ul className="experience-description">
                    {exp.description.map((desc, idx) => (
                      <li key={idx}>{desc}</li>
                    ))}
                  </ul>

                  <div className="technologies">
                    <FaCode className="tech-icon-header" />
                    <span className="tech-label">Technologies:</span>
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



