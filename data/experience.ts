export type ExperienceItem = {
  company: string
  role: string
  startDate: string
  endDate: string
  location: string
  description: string[]
}

export const experience: ExperienceItem[] = [
  {
    company: 'Bizsun Creative',
    role: 'Full-Stack Developer',
    startDate: 'Dec 2025',
    endDate: 'Present',
    location: 'India',
    description: [
      'Architected and deployed client-facing web applications using Next.js, React, Node.js, and MongoDB',
      'Owned complete product lifecycle from requirements gathering and system design through production deployment',
      'Collaborated directly with clients and cross-functional teams to define scope, iterate on features, and ship on schedule',
      'Built scalable REST APIs and integrated third-party services to support growing user bases',
    ],
  },
  {
    company: 'Genex Corporate Services',
    role: 'Forward Deployed Engineer Intern',
    startDate: 'Mar 2025',
    endDate: 'Nov 2025',
    location: 'Remote',
    description: [
      'Independently designed and deployed GenBore and Vorksinta company websites from specification to live production',
      'Engineered full-stack features for Internsta, an Internshala-style internship marketplace, including search, listings, and application workflows',
      'Developed deployment-ready backend APIs integrated with frontend SPAs',
      'Partnered with product and design teams to translate business requirements into technical deliverables',
    ],
  },
  {
    company: 'Yash Computer Education Center',
    role: 'Programming Instructor',
    startDate: 'Aug 2023',
    endDate: 'Nov 2025',
    location: 'Muzaffarnagar',
    description: [
      'Taught HTML, CSS, JavaScript, C, and C++ to 50+ students',
      'Designed hands-on curriculum and coding labs',
      'Mentored students through debugging workflows and real-world software development practices',
    ],
  },
]
