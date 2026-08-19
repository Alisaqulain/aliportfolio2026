import React from 'react'
import { motion } from 'framer-motion'
import { 
  FaReact, FaNodeJs, FaPython, FaJs, FaHtml5, FaCss3Alt,
  FaGitAlt, FaDocker, FaAws, FaAndroid, FaApple
} from 'react-icons/fa'
import { SiNextdotjs, SiMongodb, SiPostgresql, SiTypescript, SiFlutter } from 'react-icons/si'

const RotatingTechIcons = () => {
  const icons = [
    { icon: <FaReact />, name: 'React', color: '#61dafb' },
    { icon: <SiNextdotjs />, name: 'Next.js', color: '#000000' },
    { icon: <FaNodeJs />, name: 'Node.js', color: '#339933' },
    { icon: <SiTypescript />, name: 'TypeScript', color: '#3178c6' },
    { icon: <FaPython />, name: 'Python', color: '#3776ab' },
    { icon: <SiMongodb />, name: 'MongoDB', color: '#47a248' },
    { icon: <SiPostgresql />, name: 'PostgreSQL', color: '#336791' },
    { icon: <SiFlutter />, name: 'Flutter', color: '#02569b' },
    { icon: <FaAws />, name: 'AWS', color: '#ff9900' },
    { icon: <FaDocker />, name: 'Docker', color: '#2496ed' },
    { icon: <FaGitAlt />, name: 'Git', color: '#f05032' },
    { icon: <FaAndroid />, name: 'Android', color: '#3ddc84' },
  ]

  return (
    <div className="rotating-icons-container">
      <div className="rotating-ring">
        {icons.map((tech, index) => {
          const angle = (index * 360) / icons.length
          const radius = 120
          const x = Math.cos((angle * Math.PI) / 180) * radius
          const y = Math.sin((angle * Math.PI) / 180) * radius

          return (
            <motion.div
              key={tech.name}
              className="tech-icon-wrapper"
              style={{
                position: 'absolute',
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)'
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear'
                },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.1
                }
              }}
              whileHover={{ scale: 1.5, zIndex: 10 }}
            >
              <div
                className="tech-icon"
                style={{ color: tech.color }}
              >
                {tech.icon}
              </div>
            </motion.div>
          )
        })}
      </div>
      <div className="rotating-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        >
          <FaReact size={40} color="#61dafb" />
        </motion.div>
      </div>
    </div>
  )
}

export default RotatingTechIcons
