import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import LearningPath from './components/LearningPath';
import Achievements from './components/Achievements';
import Resume from './components/Resume';
import Contact from './components/Contact';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 transition-all duration-500">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <LearningPath />
          <Achievements />
          <Contact />
        </main>
        
        {/* Copyright Footer */}
        <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-black dark:via-gray-900 dark:to-black text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Thank You for Visiting! 🙏
              </h3>
              <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
                I'm excited about the possibility of working together and contributing to innovative projects.
              </p>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-300 mb-2">
                Made with <span className="text-red-400 animate-pulse">❤️</span> using{' '}
                <span className="text-blue-400 font-semibold">React</span> and lots of{' '}
                <span className="text-yellow-400">☕</span>
              </p>
            </div>
            
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-400 mb-2">
                © {new Date().getFullYear()} Abishek. Built with React, TypeScript, and Tailwind CSS.
              </p>
              <p className="text-sm text-gray-500">
                Actively seeking opportunities to contribute and grow in the tech industry.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;