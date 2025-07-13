import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Users, ExternalLink } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    {
      title: "Switchathon Winner",
      subtitle: "Hackathon 2024",
      description: "First place winner in college-level coding competition",
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
    },
    {
      title: "AWS Cloud Practitioner",
      subtitle: "AWS Educate",
      description: "Certified in cloud computing fundamentals and AWS services",
      icon: Award,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
    },
    {
      title: "UI/UX Webinar Certificate",
      subtitle: "Adobe x Campus Event",
      description: "Completed advanced UI/UX design principles workshop",
      icon: Award,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
    },
    {
      title: "ESP Workshop Attendee",
      subtitle: "IoT with ESP",
      description: "Attended comprehensive hands-on session learning real-time ESP programming and IoT fundamentals",
      icon: Users,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
    },
    {
      title: "Ethical Hacking Workshop Organizer",
      subtitle: "3-Day Cybersecurity Event",
      description: "Organized and led a comprehensive 3-day ethical hacking workshop covering penetration testing and security fundamentals",
      icon: Users,
      color: "from-red-500 to-pink-500",
      bgColor: "from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20",
      isLeadership: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8">
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
            Achievements & Leadership
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
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${achievement.bgColor} border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 group`}
            >
              {achievement.isLeadership && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-full">
                    Leadership
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${achievement.color} text-white mb-6 shadow-lg`}>
                  <achievement.icon size={32} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {achievement.title}
                </h3>

                <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${achievement.color} text-white text-sm font-semibold mb-4`}>
                  {achievement.subtitle}
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {achievement.description}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const certificateUrls = {
                      'Switchathon Winner': 'https://drive.google.com/file/d/1ENNRiZEKvM5p8wB1yee0WA-61IkUSxCe/view?usp=drivesdk',
                      'AWS Cloud Practitioner': 'https://drive.google.com/file/d/1EKIZRnx-ptcOX-xmOMh815_rEetUjMKO/view?usp=drivesdk',
                      'UI/UX Webinar Certificate': 'https://drive.google.com/file/d/1EJVx8poygbOzdEwASlh2drcumC6z_eSR/view?usp=drivesdk',
                      'ESP Workshop Attendee': 'https://drive.google.com/file/d/1EQf_Z-x-MHctZuAlr0eAMaYB5LB5Yu5j/view?usp=drivesdk',
                      'Ethical Hacking Workshop Organizer': 'https://certificates.example.com/ethical-hacking-organizer'
                    };
                    window.open(certificateUrls[achievement.title as keyof typeof certificateUrls], '_blank');
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                >
                  <ExternalLink size={18} />
                  View Certificate
                </motion.button>
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

export default Achievements;