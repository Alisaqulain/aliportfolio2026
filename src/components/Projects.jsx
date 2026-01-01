import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa'
import ProjectCard from './ProjectCard'
import './Projects.css'

const Projects = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const projects = [
    {
      id: 1,
      title: 'Airbnb Clone',
      description: 'Full-featured Airbnb clone with booking system, user authentication, and payment integration.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: '🏠',
      color: '#FF5A5F'
    },
    {
      id: 2,
      title: 'Ali GPT',
      description: 'AI-powered chatbot application with natural language processing and conversational interface.',
      tech: ['React', 'OpenAI API', 'Node.js', 'Express'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: '🤖',
      color: '#00A67E'
    },
    {
      id: 3,
      title: 'Apna Video Call',
      description: 'Real-time video conferencing application with screen sharing and chat functionality.',
      tech: ['WebRTC', 'Socket.io', 'React', 'Node.js'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: '📹',
      color: '#4285F4'
    },
    {
      id: 4,
      title: 'Zerodha Clone',
      description: 'Trading platform clone with real-time market data, portfolio management, and order execution.',
      tech: ['React', 'TypeScript', 'WebSocket', 'Node.js'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: '📈',
      color: '#387ED1'
    },
    {
      id: 5,
      title: 'ChatApp',
      description: 'Real-time messaging application with group chats, file sharing, and emoji support.',
      tech: ['React', 'Socket.io', 'MongoDB', 'Node.js'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: '💬',
      color: '#25D366'
    },
    {
      id: 6,
      title: 'Dunex Dubai',
      description: 'E-commerce platform for Dubai market with multi-language support and payment gateway.',
      tech: ['Next.js', 'PostgreSQL', 'Stripe', 'AWS'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: '🛒',
      color: '#FF6B35'
    },
    {
      id: 7,
      title: 'MPCPCT',
      description: 'Management platform with comprehensive features for tracking and analytics.',
      tech: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: '📊',
      color: '#6366F1'
    },
    {
      id: 8,
      title: 'Digital Career Center',
      description: 'Job portal with resume builder, job matching algorithm, and interview scheduling.',
      tech: ['React', 'Python', 'PostgreSQL', 'Django'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: '💼',
      color: '#8B5CF6'
    },
    {
      id: 9,
      title: 'Krishi Kutumb',
      description: 'Agricultural platform connecting farmers with buyers, featuring marketplace and logistics.',
      tech: ['Flutter', 'Firebase', 'Node.js', 'MongoDB'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: '🌾',
      color: '#10B981'
    },
    {
      id: 10,
      title: 'MZ Technicals',
      description: 'Technical services platform with service booking, technician management, and reviews.',
      tech: ['React', 'Node.js', 'MongoDB', 'Razorpay'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: '🔧',
      color: '#F59E0B'
    }
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
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} inView={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects

