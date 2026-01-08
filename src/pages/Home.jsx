import React, { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { Suspense } from 'react'
import { 
  FaArrowDown, FaCode, FaRocket, FaBrain, FaLayerGroup, FaMobile, 
  FaCloud, FaDatabase, FaCog, FaStar, FaQuoteLeft, FaGithub, 
  FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaAward,
  FaUsers, FaProjectDiagram, FaCheckCircle, FaFire, FaClock,
  FaBriefcase, FaGraduationCap, FaTrophy, FaHandshake, FaThumbsUp
} from 'react-icons/fa'
import { 
  SiReact, SiNextdotjs, SiNodedotjs, SiMongodb, SiTypescript, SiPython,
  SiJavascript, SiHtml5, SiCss3, SiBootstrap, SiTailwindcss, SiExpress,
  SiMysql, SiSupabase, SiFirebase, SiGit, SiGithub, SiDjango, SiExpo
} from 'react-icons/si'
import ParticleField from '../components/ParticleField'
import FloatingObjects from '../components/FloatingObjects'
import './Home.css'

const Home = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  
  // Scroll progress for top indicator
  const { scrollYProgress: pageScrollProgress } = useScroll()
  const scrollProgressWidth = useTransform(pageScrollProgress, [0, 1], ['0%', '100%'])

  const technologies = [
    { icon: <SiReact />, name: 'React', color: '#61dafb' },
    { icon: <SiNextdotjs />, name: 'Next.js', color: '#000000' },
    { icon: <SiNodedotjs />, name: 'Node.js', color: '#339933' },
    { icon: <SiJavascript />, name: 'JavaScript', color: '#f7df1e' },
    { icon: <SiTypescript />, name: 'TypeScript', color: '#3178c6' },
    { icon: <SiHtml5 />, name: 'HTML5', color: '#e34f26' },
    { icon: <SiCss3 />, name: 'CSS3', color: '#1572b6' },
    { icon: <SiBootstrap />, name: 'Bootstrap', color: '#7952b3' },
    { icon: <SiTailwindcss />, name: 'Tailwind CSS', color: '#06b6d4' },
    { icon: <SiExpress />, name: 'Express.js', color: '#000000' },
    { icon: <SiMongodb />, name: 'MongoDB', color: '#47a248' },
    { icon: <SiMysql />, name: 'MySQL', color: '#4479a1' },
    { icon: <SiSupabase />, name: 'Supabase', color: '#3ecf8e' },
    { icon: <SiFirebase />, name: 'Firebase', color: '#ffca28' },
    { icon: <SiPython />, name: 'Python', color: '#3776ab' },
    { icon: <SiDjango />, name: 'Django', color: '#092e20' },
    { icon: <SiExpo />, name: 'React Native', color: '#000020' },
    { icon: <SiGithub />, name: 'Git/GitHub', color: '#181717' },
  ]

  if (isLoading) {
    return (
      <div className="loading-screen">
        <motion.div
          className="loading-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <FaCode />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="loading-text"
          >
            Loading Portfolio...
          </motion.h2>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="home-page" ref={containerRef}>
      {/* Scroll Progress Indicator */}
      <motion.div 
        className="scroll-progress-bar"
        style={{ width: scrollProgressWidth }}
      />
      
      {/* Hero Section - Full Screen */}
      <section id="hero" className="hero-section" ref={ref} aria-label="Hero Section">
        <div className="hero-background">
          {!isMobile ? (
            <Suspense fallback={null}>
              <Canvas 
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
                onCreated={({ gl }) => {
                  gl.setClearColor('#0a0a0f', 0)
                }}
                dpr={[1, 1.5]}
                performance={{ min: 0.5 }}
              >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7b2cbf" />
                <Stars radius={300} depth={60} count={isMobile ? 1000 : 5000} factor={7} fade speed={1} />
                <ParticleField />
                <FloatingObjects />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
              </Canvas>
            </Suspense>
          ) : (
            <div className="hero-background-static" />
          )}
        </div>

        <motion.div 
          className="hero-content"
          style={{ y, opacity, scale }}
        >
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 100, z: -100 }}
            animate={inView ? { opacity: 1, y: 0, z: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, type: 'spring', stiffness: 100 }}
          >
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, scale: 0, rotateX: -90 }}
              animate={inView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
            >
              <FaFire className="badge-icon" />
              <span>Full-Stack Developer</span>
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 50, z: -50 }}
              animate={inView ? { opacity: 1, y: 0, z: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, type: 'spring', stiffness: 80 }}
            >
              <span className="gradient-text">Ali Saqulain</span>
              <br />
              <motion.span 
                className="subtitle"
                initial={{ opacity: 0, x: -50, z: -30 }}
                animate={inView ? { opacity: 1, x: 0, z: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Full-Stack Web & App Developer
              </motion.span>
            </motion.h1>

            <motion.div
              className="hero-info"
              initial={{ opacity: 0, y: 30, z: -20 }}
              animate={inView ? { opacity: 1, y: 0, z: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="info-grid">
                <div className="info-item-card">
                  <FaMapMarkerAlt className="info-icon" />
                  <div>
                    <span className="info-label">Location</span>
                    <span className="info-value">Delhi-NCR</span>
                  </div>
                </div>
                <div className="info-item-card">
                  <FaPhone className="info-icon" />
                  <div>
                    <span className="info-label">Phone</span>
                    <span className="info-value">+91 9457818861</span>
                  </div>
                </div>
                <div className="info-item-card">
                  <FaEnvelope className="info-icon" />
                  <div>
                    <span className="info-label">Email</span>
                    <span className="info-value">zaidiali087@gmail.com</span>
                  </div>
                </div>
              </div>
              <div className="hero-social">
                <motion.a 
                  href="https://www.linkedin.com/in/ali-saqulain-7404a8287" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3, z: 10 }}
                  className="social-btn"
                >
                  <FaLinkedin />
                  <span>LinkedIn</span>
                </motion.a>
                <motion.a 
                  href="https://github.com/Alisaqulain" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3, z: 10 }}
                  className="social-btn"
                >
                  <FaGithub />
                  <span>GitHub</span>
                </motion.a>
              </div>
            </motion.div>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 30, z: -20 }}
              animate={inView ? { opacity: 1, y: 0, z: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Full-Stack Web & Mobile App Developer with hands-on experience in Next.js, React, Node.js, MongoDB, Supabase, and React Native. 
              Strong foundation in Data Structures & Algorithms (DSA) with proven problem-solving abilities. 
              Skilled in building scalable, responsive, and AI-integrated applications, developing robust REST APIs, and delivering production-ready solutions.
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 30, z: -20 }}
              animate={inView ? { opacity: 1, y: 0, z: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.a
                href="/projects"
                className="btn btn-primary"
                whileHover={{ scale: 1.05, y: -5, z: 15, boxShadow: '0 25px 60px rgba(0, 212, 255, 0.6)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View Projects</span>
                <FaRocket className="btn-icon" />
                <div className="btn-shine"></div>
              </motion.a>
              <motion.a
                href="/contact"
                className="btn btn-secondary"
                whileHover={{ scale: 1.05, y: -5, z: 15, boxShadow: '0 25px 60px rgba(123, 44, 191, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Contact Me</span>
                <FaCode className="btn-icon" />
                <div className="btn-shine"></div>
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 100, z: -50 }}
            animate={inView ? { opacity: 1, x: 0, z: 0 } : {}}
            transition={{ duration: 1, delay: 0.5, type: 'spring' }}
          >
            <div className="floating-card">
              <div className="card-glow"></div>
              <div className="card-content">
                <div className="tech-icons-preview">
                  {technologies.slice(0, 4).map((tech, idx) => (
                    <motion.div
                      key={idx}
                      className="tech-icon-small"
                      style={{ color: tech.color }}
                      animate={{ 
                        rotate: [0, 360],
                        y: [0, -10, 0]
                      }}
                      transition={{ 
                        duration: 3 + idx,
                        repeat: Infinity,
                        delay: idx * 0.2
                      }}
                    >
                      {tech.icon}
                    </motion.div>
                  ))}
                </div>
                <FaCode className="card-icon" />
                <h3>Full-Stack Developer</h3>
                <p>Building the future, one line of code at a time</p>
                <div className="card-stats">
                  <div className="card-stat">
                    <span className="stat-number">15+</span>
                    <span className="stat-label">Projects</span>
                  </div>
                  <div className="card-stat">
                    <span className="stat-number">2+</span>
                    <span className="stat-label">Years</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaArrowDown />
          <span>Scroll to explore</span>
        </motion.div>
      </section>

      {/* Quick Stats Bar */}
      <section className="quick-stats-section" aria-label="Quick Statistics">
        <div className="quick-stats-container">
          {[
            { icon: <FaProjectDiagram />, number: '15+', label: 'Projects', color: '#00d4ff' },
            { icon: <FaUsers />, number: '10+', label: 'Happy Clients', color: '#7b2cbf' },
            { icon: <FaCode />, number: '18+', label: 'Technologies', color: '#ff006e' },
            { icon: <FaAward />, number: '100%', label: 'Satisfaction', color: '#00d4ff' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="quick-stat-item"
              initial={{ opacity: 0, y: 30, z: -50 }}
              whileInView={{ opacity: 1, y: 0, z: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5, z: 15 }}
              style={{ '--stat-color': stat.color }}
            >
              <div className="quick-stat-icon">{stat.icon}</div>
              <div className="quick-stat-content">
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" aria-label="Services and Features">
        <div className="features-container">
          <motion.div
            className="features-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>What I Do</h2>
            <p>Transforming ideas into digital reality with cutting-edge technology</p>
          </motion.div>

          <div className="features-grid">
            {[
              {
                icon: <FaCode />,
                title: 'Frontend Development',
                description: 'Building beautiful, responsive user interfaces with React, Next.js, and modern CSS. Creating pixel-perfect designs that work flawlessly across all devices.',
                color: '#00d4ff',
                features: ['React & Next.js', 'Responsive Design', 'Modern UI/UX']
              },
              {
                icon: <FaLayerGroup />,
                title: 'Backend Development',
                description: 'Creating robust APIs and server-side solutions with Node.js, Express, and Django. Building scalable architectures that handle millions of requests.',
                color: '#7b2cbf',
                features: ['REST APIs', 'Database Design', 'Cloud Services']
              },
              {
                icon: <FaMobile />,
                title: 'Mobile Development',
                description: 'Developing cross-platform mobile apps with React Native and Expo. Creating native-like experiences for iOS and Android from a single codebase.',
                color: '#ff006e',
                features: ['React Native', 'Cross-Platform', 'App Store Ready']
              },
              {
                icon: <FaBrain />,
                title: 'AI Integration',
                description: 'Integrating AI capabilities into applications using OpenAI and machine learning. Building intelligent systems that learn and adapt.',
                color: '#00d4ff',
                features: ['OpenAI API', 'ML Models', 'Smart Automation']
              },
              {
                icon: <FaDatabase />,
                title: 'Database Solutions',
                description: 'Designing and optimizing databases with MongoDB, MySQL, and Supabase. Ensuring data integrity and performance at scale.',
                color: '#7b2cbf',
                features: ['MongoDB', 'SQL Databases', 'Real-time Sync']
              },
              {
                icon: <FaCloud />,
                title: 'Cloud & DevOps',
                description: 'Deploying applications to cloud platforms and setting up CI/CD pipelines. Ensuring high availability and scalability.',
                color: '#ff006e',
                features: ['AWS', 'Docker', 'CI/CD']
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 50, z: -50 }}
                whileInView={{ opacity: 1, y: 0, z: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10, 
                  z: 20,
                  rotateY: 5,
                  rotateX: 5
                }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  '--feature-color': feature.color
                }}
              >
                <div className="feature-icon" style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-tags">
                  {feature.features.map((tag, idx) => (
                    <span key={idx} className="feature-tag">{tag}</span>
                  ))}
                </div>
                <div className="feature-glow"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="technologies-section" aria-label="Technologies">
        <div className="technologies-container">
          <motion.div
            className="technologies-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Technologies I Work With</h2>
            <p>Mastering the tools that power modern web applications</p>
          </motion.div>

          <div className="technologies-grid">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                className="tech-card"
                initial={{ opacity: 0, scale: 0, z: -100 }}
                whileInView={{ opacity: 1, scale: 1, z: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.2, 
                  y: -15, 
                  z: 30,
                  rotateY: 360
                }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  color: tech.color
                }}
              >
                <div className="tech-icon-large">
                  {tech.icon}
                </div>
                <span className="tech-name">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" aria-label="Statistics">
        <div className="stats-container">
          <motion.div
            className="stats-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>By The Numbers</h2>
            <p>Results that speak for themselves</p>
          </motion.div>

          <div className="stats-grid">
            {[
              { number: '15+', label: 'Projects Completed', icon: <FaRocket />, description: 'Successfully delivered projects' },
              { number: '2+', label: 'Years Experience', icon: <FaCode />, description: 'Building amazing products' },
              { number: '18+', label: 'Technologies', icon: <FaLayerGroup />, description: 'Mastered and ready to use' },
              { number: '100%', label: 'Client Satisfaction', icon: <FaBrain />, description: 'Happy clients worldwide' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, scale: 0, z: -100 }}
                whileInView={{ opacity: 1, scale: 1, z: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -10, 
                  z: 30,
                  rotateY: 10
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <h3>{stat.number}</h3>
                <p className="stat-label">{stat.label}</p>
                <p className="stat-description">{stat.description}</p>
                <div className="stat-glow"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline/Experience Preview Section */}
      <section className="timeline-section" aria-label="Experience Timeline">
        <div className="timeline-container">
          <motion.div
            className="timeline-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>My Journey</h2>
            <p>From learning to leading - a timeline of growth and achievements</p>
          </motion.div>

          <div className="timeline-wrapper">
            {[
              {
                year: '2025',
                title: 'Full-Stack Developer',
                company: 'Bizsun Creative',
                description: 'Working on client-based web and mobile application projects. Developing scalable solutions using Next.js, React, Node.js, MongoDB, and Supabase. Collaborating with design and marketing teams to deliver high-performance, SEO-optimized products.',
                icon: <FaBriefcase />,
                color: '#00d4ff',
                achievements: ['Client Projects', 'Scalable Solutions', 'SEO Optimization']
              },
              {
                year: '2024-2025',
                title: 'Full-Stack Developer Intern',
                company: 'Genex Corporate Services (Remote)',
                description: 'Developed GenBore and Vorksinta company websites using React.js as solo projects. Contributed to Internsta platform, initially built with Next.js, later migrated to Django. Worked on frontend, backend, APIs, and deployment-ready features.',
                icon: <FaCode />,
                color: '#7b2cbf',
                achievements: ['React.js Projects', 'Django Migration', 'Full-Stack Development']
              },
              {
                year: '2023-Present',
                title: 'Computer Programming Instructor',
                company: 'Yash Computer Education Center',
                description: 'Instructing students in programming languages including HTML5, CSS3, JavaScript, C and C++. Designing and conducting hands-on coding exercises and project-based learning sessions.',
                icon: <FaGraduationCap />,
                color: '#ff006e',
                achievements: ['Teaching Experience', 'Student Mentorship', 'Curriculum Design']
              },
              {
                year: '2023-Present',
                title: 'Bachelor of Computer Application',
                company: 'Muzaffarnagar',
                description: 'Pursuing BCA degree while building real-world projects and gaining professional experience. Strong foundation in Data Structures & Algorithms.',
                icon: <FaGraduationCap />,
                color: '#00d4ff',
                achievements: ['DSA Expertise', 'Academic Excellence', 'Practical Learning']
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10, z: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="timeline-marker" style={{ '--timeline-color': item.color }}>
                  <div className="timeline-icon">{item.icon}</div>
                </div>
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h3>{item.title}</h3>
                  <p className="timeline-company">{item.company}</p>
                  <p className="timeline-description">{item.description}</p>
                  <div className="timeline-achievements">
                    {item.achievements.map((achievement, idx) => (
                      <span key={idx} className="achievement-badge">
                        <FaCheckCircle /> {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" aria-label="Client Testimonials">
        <div className="testimonials-container">
          <motion.div
            className="testimonials-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>What Clients Say</h2>
            <p>Real feedback from real projects</p>
          </motion.div>

          <div className="testimonials-grid">
            {[
              {
                name: 'Sarah Johnson',
                role: 'CEO, TechStart Inc.',
                content: 'Ali delivered an exceptional web application that exceeded our expectations. His attention to detail and technical expertise is outstanding. Highly recommended!',
                rating: 5,
                project: 'E-commerce Platform',
                avatar: 'SJ'
              },
              {
                name: 'Michael Chen',
                role: 'Founder, Digital Solutions',
                content: 'Working with Ali was a pleasure. He transformed our vision into a beautiful, functional mobile app. The project was completed on time and within budget.',
                rating: 5,
                project: 'Mobile App Development',
                avatar: 'MC'
              },
              {
                name: 'Emily Rodriguez',
                role: 'Product Manager, InnovateCo',
                content: 'Ali\'s full-stack development skills are impressive. He built a scalable backend and a stunning frontend. The AI integration he added was the perfect touch!',
                rating: 5,
                project: 'AI-Powered Dashboard',
                avatar: 'ER'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, y: 50, z: -50 }}
                whileInView={{ opacity: 1, y: 0, z: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10, 
                  z: 20,
                  rotateY: 5
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="testimonial-header">
                  <div className="testimonial-avatar">
                    {testimonial.avatar}
                  </div>
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                    <div className="testimonial-rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="star-icon" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="testimonial-quote">
                  <FaQuoteLeft className="quote-icon" />
                  <p>{testimonial.content}</p>
                </div>
                <div className="testimonial-project">
                  <FaProjectDiagram /> {testimonial.project}
                </div>
                <div className="testimonial-glow"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" aria-label="Call to Action">
        <div className="cta-container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 50, z: -50 }}
            whileInView={{ opacity: 1, y: 0, z: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="cta-icon"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <FaHandshake />
            </motion.div>
            <h2>Ready to Build Something Amazing?</h2>
            <p>Let's collaborate and turn your vision into reality. I'm here to help you create something extraordinary.</p>
            <div className="cta-stats">
              <div className="cta-stat">
                <FaThumbsUp />
                <span>100% Satisfaction</span>
              </div>
              <div className="cta-stat">
                <FaClock />
                <span>On-Time Delivery</span>
              </div>
              <div className="cta-stat">
                <FaTrophy />
                <span>Quality Guaranteed</span>
              </div>
            </div>
            <div className="cta-buttons">
              <motion.a
                href="/projects"
                className="cta-btn cta-primary"
                whileHover={{ scale: 1.05, y: -5, z: 15 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View My Work</span>
                <FaRocket />
              </motion.a>
              <motion.a
                href="/contact"
                className="cta-btn cta-secondary"
                whileHover={{ scale: 1.05, y: -5, z: 15 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get In Touch</span>
                <FaEnvelope />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home