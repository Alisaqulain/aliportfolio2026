import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FaReact, FaNodeJs, FaPython, FaJs, FaHtml5, FaCss3Alt,
  FaGitAlt, FaDocker, FaAws, FaAndroid, FaApple
} from 'react-icons/fa'
import { SiNextdotjs, SiMongodb, SiPostgresql, SiTypescript, SiFlutter } from 'react-icons/si'
import SkillBar from './SkillBar'
import RotatingTechIcons from './RotatingTechIcons'
import './About.css'

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const skills = [
    { name: 'React/Next.js', level: 95, icon: <FaReact /> },
    { name: 'Node.js', level: 90, icon: <FaNodeJs /> },
    { name: 'TypeScript', level: 88, icon: <SiTypescript /> },
    { name: 'Python', level: 85, icon: <FaPython /> },
    { name: 'MongoDB', level: 90, icon: <SiMongodb /> },
    { name: 'PostgreSQL', level: 85, icon: <SiPostgresql /> },
    { name: 'Flutter', level: 80, icon: <SiFlutter /> },
    { name: 'AWS', level: 75, icon: <FaAws /> },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="about-container">
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            <span className="title-number">01.</span>
            About Me
          </h2>
          <div className="title-underline"></div>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="profile-card"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h3>Full-Stack Developer</h3>
              <p>
                I'm a passionate Full-Stack Web & App Developer with expertise in building
                scalable, high-performance applications. I specialize in modern JavaScript
                frameworks, cloud technologies, and mobile app development.
              </p>
              <p>
                With a strong foundation in both frontend and backend technologies, I create
                seamless digital experiences that combine beautiful design with robust functionality.
              </p>
            </motion.div>

            <motion.div
              className="education-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h4>Education & Background</h4>
              <div className="education-item">
                <span className="education-year">2020 - Present</span>
                <div>
                  <h5>Full-Stack Development</h5>
                  <p>Self-taught developer with continuous learning and project-based experience</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="about-skills"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.h3
              className="skills-title"
              variants={itemVariants}
            >
              Technical Skills
            </motion.h3>

            <div className="skills-grid">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <SkillBar skill={skill} index={index} inView={inView} />
                </motion.div>
              ))}
            </div>

            <motion.div
              className="tech-icons-container"
              variants={itemVariants}
            >
              <RotatingTechIcons />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
