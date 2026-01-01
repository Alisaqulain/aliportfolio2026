import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaWhatsapp,
  FaPaperPlane, FaUser, FaComment, FaMapMarkerAlt
} from 'react-icons/fa'
import ModernPopup from '../components/ModernPopup'
import './Contact.css'

const Contact = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setShowPopup(true)
      setFormData({ name: '', email: '', message: '' })
    }, 1000)
  }

  const socialLinks = [
    { icon: <FaLinkedin />, label: 'LinkedIn', url: 'https://linkedin.com', color: '#0077b5' },
    { icon: <FaGithub />, label: 'GitHub', url: 'https://github.com', color: '#333' },
    { icon: <FaEnvelope />, label: 'Email', url: 'mailto:zaidiali087@gmail.com', color: '#ea4335' },
    { icon: <FaPhone />, label: 'Phone', url: 'tel:+919457818861', color: '#34a853' }
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
    <section id="contact" className="contact-section" ref={ref}>
      <div className="contact-container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            <span className="title-number">04.</span>
            Get In Touch
          </h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Let's collaborate and bring your ideas to life
          </p>
        </motion.div>

        <motion.div
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div
            className="contact-info"
            variants={itemVariants}
          >
            <h3>Let's Connect</h3>
            <p>
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your visions.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <FaMapMarkerAlt className="detail-icon" />
                <div>
                  <h4>Location</h4>
                  <p>Delhi-NCR, India</p>
                </div>
              </div>
              <div className="contact-detail-item">
                <FaPhone className="detail-icon" />
                <div>
                  <h4>Phone</h4>
                  <a href="tel:+919457818861">+91 9457818861</a>
                </div>
              </div>
              <div className="contact-detail-item">
                <FaEnvelope className="detail-icon" />
                <div>
                  <h4>Email</h4>
                  <a href="mailto:zaidiali087@gmail.com">zaidiali087@gmail.com</a>
                </div>
              </div>
            </div>

            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ '--social-color': social.color }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -5,
                    rotate: 5
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <div className="social-icon-wrapper">
                    {social.icon}
                  </div>
                  <span>{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            variants={itemVariants}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="form-group"
              whileFocus={{ scale: 1.02 }}
            >
              <label htmlFor="name">
                <FaUser className="input-icon" />
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
              />
            </motion.div>

            <motion.div
              className="form-group"
              whileFocus={{ scale: 1.02 }}
            >
              <label htmlFor="email">
                <FaEnvelope className="input-icon" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </motion.div>

            <motion.div
              className="form-group"
              whileFocus={{ scale: 1.02 }}
            >
              <label htmlFor="message">
                <FaComment className="input-icon" />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Your message here..."
              />
            </motion.div>

            <motion.button
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              <FaPaperPlane className="submit-icon" />
              <div className="btn-ripple"></div>
            </motion.button>
          </motion.form>
        </motion.div>
      </div>

      <motion.a
        href="https://wa.me/919457818861"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ delay: 0.5 }}
      >
        <FaWhatsapp />
        <span className="whatsapp-pulse"></span>
      </motion.a>

      <ModernPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        message="Thank you for your message! I will get back to you soon."
        type="success"
      />
    </section>
  )
}

export default Contact
