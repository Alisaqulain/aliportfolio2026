import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import ProjectCard from '../components/ProjectCard'
import './Projects.css'

const Projects = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const projects = [
    {
      id: 1,
      title: 'Airbnb-like Web Application',
      description: 'Full-stack web application for booking accommodations, similar to Airbnb. Developed backend API with Node.js and Express.js, integrating cloud storage. Built responsive UI using Bootstrap for a seamless user experience.',
      tech: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'Node.js', 'Express', 'CloudStorage'],
      github: 'https://github.com/Alisaqulain/Airbn-website',
      demo: 'https://airbn-website.vercel.app/listings',
      image: '🏠',
      color: '#FF5A5F',
      category: 'fullstack'
    },
    {
      id: 2,
      title: 'Ali GPT – Chat GPT-style Full-Stack AI Web App',
      description: 'Built from scratch a fully functional AI chat bot using OpenAI\'s API. Designed sleek frontend and backend architecture hosted separately on Render. Managed CORS, .env configs, manual routing, and complete deployment pipeline.',
      tech: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'OpenAI API'],
      github: 'https://github.com/Alisaqulain/aligpt/tree/master',
      demo: 'https://alisaqulaingpt.onrender.com/',
      image: '🤖',
      color: '#00A67E',
      category: 'ai'
    },
    {
      id: 3,
      title: 'Apna Video Call Web Application',
      description: 'Real-time video calling web application with features similar to popular communication platforms. Implemented WebRTC for peer-to-peer video calls and integrated Socket.io for real-time signaling. Designed responsive front-end using React, ensuring smooth user experience across devices.',
      tech: ['React', 'Node.js', 'Express', 'WebRTC', 'Socket.io', 'CloudStorage'],
      github: 'https://github.com/Alisaqulain/Apna-Video-Call',
      demo: 'https://apna-video-call-frontend-hygu.onrender.com/',
      image: '📹',
      color: '#4285F4',
      category: 'realtime'
    },
    {
      id: 4,
      title: 'Zerodha Clone Web Application',
      description: 'Feature-rich trading platform clone inspired by Zerodha. Designed interactive and user-friendly interface using React, Bootstrap, and Material-UI. Implemented multiple pages including home, about, products, pricing, and support. Deployed on Render for seamless access.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Bootstrap', 'Material-UI'],
      github: 'https://github.com/Alisaqulain/Zerodha-',
      demo: 'https://zerodha-6.onrender.com/',
      image: '📈',
      color: '#387ED1',
      category: 'fullstack'
    },
    {
      id: 5,
      title: 'ChatApp – WhatsApp Clone (React Native)',
      description: 'Fully responsive real-time chat application using React Native and Firebase. Implemented navigation, authentication, chat screens, and persistent storage with Async Storage. Deployed using Expo CLI, tested across Android and iOS simulators.',
      tech: ['React Native', 'Firebase', 'Expo', 'React Navigation', 'Async Storage'],
      github: 'https://github.com/Alisaqulain/chatApp',
      demo: null,
      image: '💬',
      color: '#25D366',
      category: 'mobile'
    },
    {
      id: 6,
      title: 'Vega Wealth – Dubai (Website)',
      description: 'Developed a professional financial services website for a Dubai-based client. Implemented responsive UI, optimized performance, and SEO-friendly structure using Next.js.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      github: null,
      demo: 'https://www.thevegawealth.com/',
      image: '💰',
      color: '#FF6B35',
      category: 'freelance'
    },
    {
      id: 7,
      title: 'AutoExcelPro – Dubai (Web Platform)',
      description: 'Built an enterprise-grade Excel automation platform for Dubai-based client. Designed dashboards and workflow-focused UI for business users using Next.js.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      github: null,
      demo: 'http://autoexcelpro.com/',
      image: '📊',
      color: '#6366F1',
      category: 'freelance'
    },
    {
      id: 8,
      title: 'Dunex Dubai App & Website',
      description: 'Designed and developed both web and mobile applications for an international business platform, integrating Supabase backend services for data and authentication.',
      tech: ['Next.js', 'Supabase', 'React Native'],
      github: null,
      demo: 'https://www.krishikutumb.com/',
      image: '🛒',
      color: '#FF6B35',
      category: 'freelance'
    },
    {
      id: 9,
      title: 'MPCPCT – Coaching Institute Platform',
      description: 'Implemented secure MongoDB-backed data storage for courses, students, and contact forms. Integrated online payment system for student course enrollment and fee payments.',
      tech: ['Next.js', 'MongoDB', 'Payment Integration'],
      github: null,
      demo: 'https://www.mpcpct.com/',
      image: '📚',
      color: '#6366F1',
      category: 'freelance'
    },
    {
      id: 10,
      title: 'Digital Career Center Website',
      description: 'Developed a fully responsive company website for a technical service provider using Next.js and MongoDB.',
      tech: ['Next.js', 'MongoDB'],
      github: null,
      demo: null,
      image: '💼',
      color: '#8B5CF6',
      category: 'freelance'
    },
    {
      id: 11,
      title: 'Krishi Kutumb Website',
      description: 'Built an agriculture-focused static site for a local initiative using HTML5 and CSS3.',
      tech: ['HTML5', 'CSS3'],
      github: null,
      demo: 'https://www.krishikutumb.com/',
      image: '🌾',
      color: '#10B981',
      category: 'freelance'
    },
    {
      id: 12,
      title: 'MZ Technicals Website',
      description: 'Custom-built technical company website with fully responsive layout using HTML5 and CSS3.',
      tech: ['HTML5', 'CSS3'],
      github: null,
      demo: 'https://mztechnicals.com/',
      image: '🔧',
      color: '#F59E0B',
      category: 'freelance'
    }
  ]

  const [filter, setFilter] = useState('all')

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter)

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'ai', name: 'AI/ML' },
    { id: 'realtime', name: 'Real-time' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'freelance', name: 'Freelance' }
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

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <div className="projects-container">
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            <span className="title-number">03.</span>
            Featured Projects
          </h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            A collection of projects showcasing my skills and expertise
          </p>
        </motion.div>

        <motion.div
          className="filter-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`filter-btn ${filter === category.id ? 'active' : ''}`}
              onClick={() => setFilter(category.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} inView={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects



