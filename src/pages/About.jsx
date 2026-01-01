import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FaReact, FaNodeJs, FaPython, FaJs, FaHtml5, FaCss3Alt,
  FaGitAlt, FaDocker, FaAws, FaAndroid, FaApple, FaCode,
  FaRocket, FaAward, FaTrophy, FaStar, FaCheckCircle, FaUser
} from 'react-icons/fa'
import { SiNextdotjs, SiMongodb, SiPostgresql, SiTypescript, SiFlutter, SiSupabase, SiTailwindcss, SiBootstrap } from 'react-icons/si'
import SkillBar from '../components/SkillBar'
import RotatingTechIcons from '../components/RotatingTechIcons'
import './About.css'

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const skills = [
    { name: 'React.js / Next.js', level: 95, icon: <FaReact /> },
    { name: 'Node.js / Express', level: 90, icon: <FaNodeJs /> },
    { name: 'TypeScript', level: 88, icon: <SiTypescript /> },
    { name: 'MongoDB', level: 90, icon: <SiMongodb /> },
    { name: 'Supabase', level: 85, icon: <SiSupabase /> },
    { name: 'React Native', level: 85, icon: <FaReact /> },
    { name: 'Python / Django', level: 80, icon: <FaPython /> },
    { name: 'Tailwind CSS', level: 92, icon: <SiTailwindcss /> },
  ]

  const frontendSkills = ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Bootstrap', 'Tailwind CSS']
  const mobileSkills = ['React Native', 'Expo']
  const backendSkills = ['Node.js', 'Express.js', 'REST APIs', 'Supabase', 'Python', 'Django']
  const databaseSkills = ['MongoDB', 'MySQL']
  const toolsSkills = ['Git', 'GitHub', 'VS Code', 'Cloud Storage', 'Authentication']

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
            {/* Profile Avatar Section */}
            <motion.div
              className="profile-avatar-card"
              initial={{ opacity: 0, scale: 0.8, z: -50 }}
              animate={inView ? { opacity: 1, scale: 1, z: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5, z: 10 }}
            >
              <div className="avatar-container">
                <div className="avatar-glow"></div>
                <div className="avatar-icon">
                  <FaUser />
                </div>
                <div className="avatar-badge">
                  <FaCode />
                </div>
              </div>
              <h3>Ali Saqulain</h3>
              <p className="avatar-role">Full-Stack Developer</p>
              <div className="avatar-stats">
                <div className="avatar-stat">
                  <FaRocket />
                  <span>10+ Projects</span>
                </div>
                <div className="avatar-stat">
                  <FaAward />
                  <span>2+ Years</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="profile-card"
              initial={{ opacity: 0, y: 30, z: -30 }}
              animate={inView ? { opacity: 1, y: 0, z: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -5, z: 10 }}
            >
              <h3>Full-Stack Web & App Developer</h3>
              <p>
                Full-Stack Web & App Developer with hands-on experience in Next.js, React, Node.js, 
                MongoDB, Supabase, and React Native. Skilled in building scalable, responsive, and 
                AI-integrated applications. Strong in problem-solving, API development, and delivering 
                efficient, production-ready solutions as part of a collaborative team.
              </p>
              <p>
                With a strong foundation in both frontend and backend technologies, I create
                seamless digital experiences that combine beautiful design with robust functionality.
              </p>
            </motion.div>

            {/* Achievements Section */}
            <motion.div
              className="achievements-card"
              initial={{ opacity: 0, y: 30, z: -30 }}
              animate={inView ? { opacity: 1, y: 0, z: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02, y: -5, z: 10 }}
            >
              <h4>
                <FaTrophy className="section-icon" />
                Key Achievements
              </h4>
              <div className="achievements-list">
                {[
                  { icon: <FaCheckCircle />, text: 'Built 10+ Production Applications' },
                  { icon: <FaCheckCircle />, text: 'AI-Integrated Solutions Expert' },
                  { icon: <FaCheckCircle />, text: 'Full-Stack Development Specialist' },
                  { icon: <FaCheckCircle />, text: 'Mobile App Development' },
                  { icon: <FaCheckCircle />, text: 'Real-time Communication Systems' }
                ].map((achievement, idx) => (
                  <motion.div
                    key={idx}
                    className="achievement-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                  >
                    <span className="achievement-icon">{achievement.icon}</span>
                    <span>{achievement.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="education-card"
              initial={{ opacity: 0, y: 30, z: -30 }}
              animate={inView ? { opacity: 1, y: 0, z: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ scale: 1.02, y: -5, z: 10 }}
            >
              <h4>
                <FaStar className="section-icon" />
                Education
              </h4>
              <div className="education-item">
                <span className="education-year">May 2023 - Present</span>
                <div>
                  <h5>Bachelor of Computer Application</h5>
                  <p>Muzaffarnagar</p>
                </div>
              </div>
              <div className="education-item">
                <span className="education-year">May 2022</span>
                <div>
                  <h5>Intermediate (12th Grade)</h5>
                  <p>Muzaffarnagar</p>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="quick-about-stats"
              initial={{ opacity: 0, y: 30, z: -30 }}
              animate={inView ? { opacity: 1, y: 0, z: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {[
                { icon: <FaCode />, number: '15+', label: 'Tech Stack', color: '#00d4ff' },
                { icon: <FaRocket />, number: '10+', label: 'Projects', color: '#7b2cbf' },
                { icon: <FaAward />, number: '2+', label: 'Years Exp', color: '#ff006e' }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="quick-about-stat"
                  whileHover={{ scale: 1.1, y: -5, z: 15 }}
                  style={{ '--stat-color': stat.color }}
                >
                  <div className="quick-about-icon">{stat.icon}</div>
                  <div className="quick-about-content">
                    <h4>{stat.number}</h4>
                    <p>{stat.label}</p>
                  </div>
                </motion.div>
              ))}
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

            <div className="skills-categories">
              <motion.div className="skill-category" variants={itemVariants}>
                <h4>Frontend</h4>
                <div className="skill-tags">
                  {frontendSkills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div className="skill-category" variants={itemVariants}>
                <h4>Mobile</h4>
                <div className="skill-tags">
                  {mobileSkills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div className="skill-category" variants={itemVariants}>
                <h4>Backend</h4>
                <div className="skill-tags">
                  {backendSkills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div className="skill-category" variants={itemVariants}>
                <h4>Database</h4>
                <div className="skill-tags">
                  {databaseSkills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div className="skill-category" variants={itemVariants}>
                <h4>Tools & Others</h4>
                <div className="skill-tags">
                  {toolsSkills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div className="skill-category" variants={itemVariants}>
                <h4>Soft Skills</h4>
                <div className="skill-tags">
                  <span className="skill-tag">Problem-Solving</span>
                  <span className="skill-tag">Debugging</span>
                  <span className="skill-tag">Team Collaboration</span>
                </div>
              </motion.div>
            </div>

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
