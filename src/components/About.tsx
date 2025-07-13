import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Zap, Users, Target, Sparkles, Rocket, Heart } from 'lucide-react';

const About = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-6xl mx-auto">
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
            About Me
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"
          ></motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Story Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="lg:col-span-2"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/50 relative overflow-hidden"
            >
              {/* Floating Background Elements */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="absolute top-4 right-4 text-6xl opacity-10"
              >
                🚀
              </motion.div>
              <motion.div
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: '1s' }}
                className="absolute bottom-4 left-4 text-4xl opacity-10"
              >
                💡
              </motion.div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <Sparkles className="text-white" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Hello there! 👋</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">I'm Abishek</p>
                  </div>
                </div>

                <div className="space-y-6 text-lg leading-relaxed">
                  <p className="text-gray-700 dark:text-gray-300">
                    I'm a <span className="font-bold text-purple-600 dark:text-purple-400">curious developer</span> who turns ideas into intelligent applications. I love building things that think, respond, and evolve.
                  </p>

                  <p className="text-gray-700 dark:text-gray-300">
                    Whether it's detecting brain tumors with <span className="font-semibold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-lg">deep learning</span>, building chatbots that hold real conversations, or generating <span className="font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-lg">AI captions</span> — I enjoy solving real-world problems with code.
                  </p>

                  <p className="text-gray-700 dark:text-gray-300">
                    I work across <span className="font-semibold text-green-600 dark:text-green-400">full-stack development</span> and <span className="font-semibold text-purple-600 dark:text-purple-400">AI-powered applications</span>. I boost my workflow using <span className="font-semibold text-orange-600 dark:text-orange-400">ChatGPT and GitHub Copilot</span> to code smarter and learn faster.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats & Highlights */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-6"
          >
            {/* Passion Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotateZ: 2 }}
              className="bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <Heart className="text-white" size={24} />
                <h4 className="font-bold text-lg">My Passion</h4>
              </div>
              <p className="text-red-100">
                Building intelligent solutions that make a real-world impact
              </p>
            </motion.div>

            {/* Tech Focus Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotateZ: -2 }}
              className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <Brain className="text-white" size={24} />
                <h4 className="font-bold text-lg">Focus Areas</h4>
              </div>
              <div className="space-y-2 text-blue-100">
                <p>• AI & Machine Learning</p>
                <p>• Full-Stack Development</p>
                <p>• Problem Solving</p>
              </div>
            </motion.div>

            {/* Goal Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotateZ: 1 }}
              className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <Target className="text-white" size={24} />
                <h4 className="font-bold text-lg">My Goal</h4>
              </div>
              <p className="text-green-100">
                Keep building. Keep learning. Create impact from day one.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills Showcase */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/50 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Brain className="text-white" size={32} />
            </div>
            <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-2">AI Enthusiast</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Building intelligent systems with deep learning and neural networks
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/50 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Code className="text-white" size={32} />
            </div>
            <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Full-Stack Developer</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Creating end-to-end solutions with modern web technologies
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/50 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="text-white" size={32} />
            </div>
            <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Team Player</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Organizing workshops and collaborating on innovative projects
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;