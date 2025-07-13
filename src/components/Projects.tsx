import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Brain, MessageCircle, Camera } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Brain Tumor Detection",
      description: "Built a deep learning model to detect tumors in MRI scans using YOLOv8 object detection",
      achievement: "Achieved 89% accuracy",
      icon: Brain,
      tech: ["Python", "YOLOv8", "Deep Learning", "OpenCV"],
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
      githubUrl: "https://github.com/Abishekdl/Brain-tumor-detection-with-bias-mitigation-.git",
      demoUrl: "https://demo.brain-tumor-detection.com"
    },
    {
      title: "College Chatbot",
      description: "Custom-trained chatbot using neural networks and NLTK for answering college-related questions",
      achievement: "High accuracy responses",
      icon: MessageCircle,
      tech: ["Python", "NLTK", "Neural Networks", "NLP"],
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
      githubUrl: "https://github.com/Abishekdl/College-based-chatbot.git",
      demoUrl: "https://demo.college-chatbot.com"
    },
    {
      title: "Garden Captioning System",
      description: "Smart garden monitoring system using BLIP image captioning for automated plant analysis",
      achievement: "Research publication intended",
      icon: Camera,
      tech: ["BLIP", "Computer Vision", "AI", "Research"],
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
      status: "In Progress",
      githubUrl: "https://github.com/Abishekdl/garden-management-system-using-blip.git",
      demoUrl: "https://demo.garden-captioning.com"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={cardVariants}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Featured Projects
          </motion.h2>
          <motion.div
            variants={cardVariants}
            className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"
          ></motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${project.bgGradient} border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 group`}
            >
              {project.status && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
                    {project.status}
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${project.gradient} text-white mb-6 shadow-lg`}>
                  <project.icon size={32} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${project.gradient} text-white text-sm font-semibold mb-6`}>
                  ✨ {project.achievement}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(project.githubUrl, '_blank')}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 hover:shadow-lg"
                  >
                    <Github size={18} />
                    GitHub
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(project.demoUrl, '_blank')}
                    className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${project.gradient} text-white rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200`}
                  >
                    <ExternalLink size={18} />
                    Demo
                  </motion.button>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/5 group-hover:via-purple-600/5 group-hover:to-pink-600/5 transition-all duration-500 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;