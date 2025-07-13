import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Code, Brain, Rocket, Star, Zap, Target } from 'lucide-react';

const LearningPath = () => {
  const learningSteps = [
    {
      year: "2021",
      title: "The Beginning",
      description: "Started with C in first year of college",
      skills: ["C Programming", "Basic Algorithms"],
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
      icon: Code,
      side: "left"
    },
    {
      year: "2022",
      title: "Object-Oriented Thinking",
      description: "Learned C++ and OOPs concepts",
      skills: ["C++", "Object-Oriented Programming", "Data Structures"],
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
      icon: Brain,
      side: "right"
    },
    {
      year: "2023",
      title: "Problem Solving & Frameworks",
      description: "Studied DSA in C, entered PG, started Java + basic frameworks",
      skills: ["Data Structures & Algorithms", "Java", "Basic Frameworks"],
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
      icon: Target,
      side: "left"
    },
    {
      year: "2024",
      title: "Full-Stack Development",
      description: "Learned Python, React, Angular, Node.js, and essential tools",
      skills: ["Python", "React", "Angular.js", "Node.js", "Git", "Docker"],
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
      icon: Zap,
      side: "right"
    },
    {
      year: "2025",
      title: "AI-Powered Growth",
      description: "Learning Operating System Concepts + Using AI tools to code faster & smarter",
      skills: ["Advanced OS Concepts", "ChatGPT", "GitHub Copilot", "AI-Assisted Development"],
      color: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20",
      icon: Star,
      side: "left",
      current: true
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

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id="learning" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6"
          >
            My Learning Journey
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            From C programming basics to AI-powered development - here's how my programming journey evolved
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"
          ></motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-purple-600 to-indigo-600 hidden lg:block"></div>

          {learningSteps.map((step, index) => (
            <motion.div
              key={step.year}
              variants={cardVariants}
              className={`relative mb-16 lg:mb-20 ${
                step.side === 'left' ? 'lg:pr-1/2 lg:text-right' : 'lg:pl-1/2 lg:ml-8'
              }`}
            >
              {/* Timeline Year Badge */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 lg:block hidden z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-2xl border-4 border-white dark:border-gray-900`}
                >
                  <step.icon size={28} />
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02, y: -5, rotateY: step.side === 'left' ? 5 : -5 }}
                transition={{ duration: 0.3 }}
                className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/50 hover:shadow-3xl transition-all duration-300 relative overflow-hidden ${
                  step.current ? 'ring-2 ring-indigo-500 dark:ring-indigo-400 ring-opacity-50' : ''
                }`}
              >
                {/* Background Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} opacity-30 rounded-3xl`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Mobile Year Badge */}
                  <div className="lg:hidden mb-6">
                    <div className={`inline-flex items-center px-6 py-3 rounded-2xl bg-gradient-to-r ${step.color} text-white font-bold shadow-lg`}>
                      <step.icon className="mr-3" size={20} />
                      {step.year}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className={`px-6 py-3 rounded-2xl bg-gradient-to-r ${step.color} text-white font-bold text-lg shadow-lg`}>
                      {step.title}
                    </div>
                    {step.current && (
                      <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg"
                      >
                        ✨ Current
                      </motion.span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                    {step.description}
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {step.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: skillIndex * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-4 py-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-600"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* What's Next Section */}
          <motion.div
            variants={cardVariants}
            className="relative lg:pr-1/2 lg:text-right"
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 lg:block hidden z-10">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center text-white shadow-2xl border-4 border-white dark:border-gray-900"
              >
                <Rocket size={28} />
              </motion.div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02, y: -5, rotateY: 5 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-teal-50 via-green-50 to-emerald-50 dark:from-teal-900/20 dark:via-green-900/20 dark:to-emerald-900/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-teal-200/50 dark:border-teal-800/50 hover:shadow-3xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-100/30 to-green-100/30 dark:from-teal-900/10 dark:to-green-900/10 rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className="lg:hidden mb-6">
                  <div className="inline-flex items-center px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-green-500 text-white font-bold shadow-lg">
                    <Rocket className="mr-3" size={20} />
                    What's Next?
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  What's Next?
                </h3>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  Continuing to deepen my OS knowledge while leveraging AI tools for faster learning and better code quality. 
                  Always ready for new challenges and opportunities!
                </p>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-end">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-bold shadow-lg"
                  >
                    <Target size={20} />
                    Seeking Opportunities
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold shadow-lg"
                  >
                    <Rocket size={20} />
                    Building Projects
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold shadow-lg"
                  >
                    <Brain size={20} />
                    Continuous Learning
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LearningPath;