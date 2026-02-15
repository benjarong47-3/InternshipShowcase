// Language Translations - English and Thai
const translations = {
    en: {
        // Navigation
        nav: {
            home: 'Home',
            introduction: 'Introduction',
            governance: 'Governance',
            team: 'Our Team',
            projects: 'Projects',
            contact: 'Contact'
        },
        // Hero Section
        hero: {
            title1: 'AMBASSADOR',
            title2: 'BILINGUAL ACADEMY',
            subtitle: 'Excellence in Language • Development of Life Skills',
            btn1: 'Explore Vision',
            btn2: 'Contact Us'
        },
        // Introduction Section
        intro: {
            label: 'Introduction',
            title: 'Welcome to Ambassador Bilingual Academy',
            heading: 'Our Vision',
            vision1: 'We aspire to be a leading educational institution that instills a love for learning, fosters critical thinking, and cultivates global citizens who contribute positively to society.',
            vision2: 'During 2024-2026, we aim to become a learning organization promoting participatory management and developing high-quality educators while ensuring educational excellence.',
            philosophy: 'Our Philosophy',
            motto: 'Excellence in Language, Development of Life Skills'
        },
        // Governance Section
        governance: {
            label: 'School Governance',
            title: 'School Governing Board',
            founders: 'Founders',
            executives: 'School Executives',
            founderBadge: 'Founder',
            directorBadge: 'School Director',
            managerBadge: 'School Manager'
        },
        // Team Section
        team: {
            label: 'Our Team',
            title: 'IT Department & Interns',
            headTitle: 'IT Department Head',
            internsTitle: 'IT Interns',
            internsSubtitle: 'Computer Engineering, Rajamangala University of Technology Lanna',
            headBadge: 'IT Department Head',
            internBadge: 'IT Intern'
        },
        // Responsibilities Section
        responsibilities: {
            label: 'Daily Work',
            title: 'Daily Responsibilities',
            gallery: 'Work Gallery',
            items: {
                workspace: 'Google Workspace Management',
                workspaceDesc: 'Create, update, delete user accounts and control access permissions.',
                maintenance: 'IT Maintenance & Support',
                maintenanceDesc: 'Maintain, repair, and install computer equipment and network systems.',
                cctv: 'CCTV System Management',
                cctvDesc: 'Monitor live feeds, adjust settings, and review recordings.',
                support: 'Technical Support',
                supportDesc: 'Provide IT support and troubleshooting for staff and teachers.',
                documentation: 'Event Documentation',
                documentationDesc: 'Capture photos and videos of school activities and events.',
                preparation: 'Event Preparation',
                preparationDesc: 'Prepare IT systems and equipment for smooth event operations.'
            }
        },
        // Projects Section
        projects: {
            label: 'Internship Projects',
            title: 'Innovation in Action',
            project1: {
                name: 'Facility Management System',
                desc: 'Click to view details',
                fullTitle: 'Facility Management System',
                fullDesc: 'A comprehensive web-based platform for managing school facilities, room bookings, and resource allocation. Built with modern web technologies including HTML5, CSS3, and JavaScript with Google Sheets as the database backend.',
                features: [
                    'Real-time room availability checking',
                    'Online booking system with calendar integration',
                    'Resource management dashboard',
                    'Automated email notifications',
                    'Google Sheets integration for data management',
                    'User-friendly interface with responsive design'
                ],
                tech: ['HTML5', 'CSS3', 'JavaScript', 'Google Sheets API', 'Google Apps Script', 'Bootstrap']
            },
            project2: {
                name: 'HR × IT Integration',
                desc: 'Click to view details',
                fullTitle: 'HR × IT Integration System',
                fullDesc: 'An integrated system connecting HR department with IT through LINE Official Account, streamlining communication and workflow between departments. Features automated notifications and request tracking.',
                features: [
                    'LINE OA integration for instant communication',
                    'Automated HR request routing',
                    'IT ticket system integration',
                    'Real-time status updates and notifications',
                    'Database synchronization',
                    'Multi-department workflow management'
                ],
                tech: ['JavaScript', 'LINE Messaging API', 'Node.js', 'Google Sheets', 'Webhook', 'Express.js']
            },
            project3: {
                name: 'IT Department Contact',
                desc: 'Click to view details',
                fullTitle: 'IT Department Contact Portal',
                fullDesc: 'A centralized web portal for IT support requests and department coordination. Provides easy access to IT services, documentation, and support ticket submission.',
                features: [
                    'Online IT support ticket system',
                    'Knowledge base and FAQs',
                    'Service request tracking',
                    'Document repository',
                    'Contact directory with search functionality',
                    'Analytics dashboard for IT metrics'
                ],
                tech: ['HTML/CSS', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap', 'Chart.js']
            },
            keyFeatures: 'Key Features',
            tech: 'Technologies Used'
        },
        // Contact Section
        contact: {
            title: 'Get in Touch',
            subtitle: 'We\'d love to hear from you.',
            location: 'Location',
            locationDesc: '133, Behind Goodview Village\nMae Hia, Chiang Mai 50100\nThailand',
            phone: 'Phone',
            phoneNum: '081-950-6659',
            name: 'Your Name',
            email: 'Email Address',
            message: 'Your Message',
            send: 'Send Message'
        },
        // Footer
        footer: {
            motto: 'Excellence in Language, Development of Life Skills',
            copyright: '© 2024 Ambassador Bilingual Academy. All rights reserved.'
        }
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
}
