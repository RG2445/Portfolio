import { useState, useEffect, useRef } from "react";
import ProfileImage from "./assets/image/WhatsApp Image 2025-06-15 at 16.48.44_a0c03585.jpg";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isProjectsHovered, setIsProjectsHovered] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });
  const animationId = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animateCursor = () => {
      // Smooth interpolation for main cursor (faster)
      const lerpFactor = 0.15;
      currentPos.current.x +=
        (mousePos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y +=
        (mousePos.current.y - currentPos.current.y) * lerpFactor;

      // Smooth interpolation for trail (slower)
      const trailLerpFactor = 0.08;
      trailPos.current.x +=
        (mousePos.current.x - trailPos.current.x) * trailLerpFactor;
      trailPos.current.y +=
        (mousePos.current.y - trailPos.current.y) * trailLerpFactor;

      // Update cursor positions directly via transform for maximum performance
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${
          currentPos.current.x - 12
        }px, ${currentPos.current.y - 12}px, 0)`;
      }

      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${
          trailPos.current.x - 4
        }px, ${trailPos.current.y - 4}px, 0)`;
      }

      animationId.current = requestAnimationFrame(animateCursor);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    animationId.current = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const projects = [
    {
      title: "Attendance-Management-System",
      description:
        " A web-based Attendance Management System that allows teachers to mark and track student attendance efficiently.Students can view their attendance statistics in real-time through a user-friendly dashboard.",
      link: "https://github.com/RG2445/College-Attendance-Record",
    },
    {
      title: "Chat-Bot",
      description:
        "An intelligent chatbot built to simulate human-like conversations and assist users with queries in real-time.Integrated with NLP and customizable flows to enhance user engagement across web platforms.",
      link: "https://github.com/RG2445/Chatbot",
    },

    {
      title: "Portfolio",
      description:
        "A responsive portfolio website built using React to showcase my projects, skills, and resume in a modern, interactive interface. It highlights my technical journey with clean design, smooth navigation, and live project demos.",
      link: "https://github.com/RG2445/Portfolio",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white cursor-none overflow-x-hidden">
      {/* Ultra Smooth Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        style={{
          transform: "translate3d(-12px, -12px, 0)",
        }}
      />

      {/* Ultra Smooth Cursor Trail */}
      <div
        ref={trailRef}
        className="fixed w-2 h-2 bg-white/50 rounded-full pointer-events-none z-[9998] will-change-transform"
        style={{
          transform: "translate3d(-4px, -4px, 0)",
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/80 backdrop-blur-md rounded-full px-8 py-4 border border-gray-700">
          <div className="flex items-center space-x-8">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "projects", label: "Projects" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative transition-colors duration-200 group ${
                    activeSection === item.id
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                  <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 bg-black/80 backdrop-blur-md rounded-2xl border border-gray-700 p-4">
            <div className="space-y-2">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "projects", label: "Projects" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200 relative group"
                >
                  {item.label}
                  <div className="absolute -bottom-1 left-4 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-[calc(100%-2rem)]"></div>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Decorative circles */}
      <div className="fixed top-20 left-20 w-4 h-4 bg-white rounded-full opacity-60 animate-pulse"></div>
      <div className="fixed top-1/3 right-20 w-6 h-6 bg-white rounded-full opacity-40 animate-pulse delay-1000"></div>
      <div className="fixed bottom-1/4 left-1/4 w-3 h-3 bg-white rounded-full opacity-50 animate-pulse delay-500"></div>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32"
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative group">
              <img
                src={ProfileImage}
                alt="Rishit Gupta"
                className="w-80 h-80 rounded-3xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out transform group-hover:scale-105"
              />
              <div className="absolute -top-4 -left-4 w-6 h-6 bg-white rounded-full animate-bounce"></div>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-xl text-gray-400 mb-4 animate-fade-in">
              Myself,
            </p>
            <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight animate-slide-up">
              RISHIT GUPTA
            </h1>
            <p className="text-xl text-gray-400 mb-8 animate-fade-in delay-300">
              nice to meet you too!
            </p>
          </div>

          <a href="https://drive.google.com/file/d/1vP_MQ4BMscS2PbZhvmvyaQaiD1pueeeH/view?usp=drive_link"><button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 hover:scale-105 transition-all duration-200 mb-12 animate-fade-in delay-500">
            View Resume
          </button></a>

          <p className="text-2xl text-gray-300 font-light animate-fade-in delay-700">
            A Love for Tech and Travel
          </p>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                NOW YOU KNOW ME, WHAT "ABOUT ME"
              </h2>
              <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-white rounded-full opacity-30 animate-pulse"></div>

              <p className="text-gray-300 leading-relaxed text-lg">
                With a passion for technology and a drive to continuously grow,
                I am a software developer dedicated to solving complex problems
                and building meaningful, innovative solutions. Logical thinking
                and a strong work ethic guide my professional journey, enabling
                me to tackle challenges effectively and deliver impactful
                results. When I step away from coding, I find inspiration in
                life's creative joys. Traveling to new places, discovering fresh
                music, and diving into books and movies that leave a lasting
                impression and enrich my perspective. These pursuits keep me
                grounded, balanced, and motivated, ensuring that I bring fresh
                ideas and unwavering enthusiasm to both my work and life.
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <div className="group">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-200">
                    Frontend
                  </h3>
                  <p className="text-gray-400">
                    HTML,CSS,Javascript,React.js, Figma
                  </p>
                </div>

                <div className="group">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-green-400 transition-colors duration-200">
                    Backend
                  </h3>
                  <p className="text-gray-400">Express.JS, Node.JS, Firebase</p>
                </div>

                <div className="group">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors duration-200">
                    Database
                  </h3>
                  <p className="text-gray-400">MongoDB, MySQL, PostgreSQL</p>
                </div>

                <div className="group">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-400 transition-colors duration-200">
                    Machine Learning
                  </h3>
                  <p className="text-gray-400">
                    Supervised,Unsupervised,DeepLearning,TensorFlow,
                    Scikit-learn,Keras,OpenCV, Neural Networks
                  </p>
                </div>

                <div className="group">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-pink-400 transition-colors duration-200">
                    Generative AI
                  </h3>
                  <p className="text-gray-400">
                    Natural Language Processing (NLP), Large Language Models
                    (LLMs), Langchain
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              KEY PROJECTS
            </h2>
            <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-white rounded-full opacity-40 animate-pulse"></div>
          </div>

          {/* Infinite Scrolling Projects */}
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsProjectsHovered(true)}
            onMouseLeave={() => setIsProjectsHovered(false)}
          >
            <div
              className={`flex space-x-8 ${
                isProjectsHovered ? "" : "animate-scroll-right"
              }`}
            >
              {/* First set of projects */}
              {projects.map((project, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 w-80 bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:bg-gray-800/70 hover:scale-105 transition-all duration-300 group"
                >
                  <h3 className="text-2xl font-bold mb-6 group-hover:text-blue-400 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-8 text-sm">
                    {project.description}
                  </p>
                  <a href="">
                    <button className="bg-transparent border border-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 hover:border-white transition-all duration-200 flex items-center group-hover:scale-105">
                      Learn More
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="ml-2"
                      >
                        <path d="m7 17 10-10"></path>
                        <path d="M7 7h10v10"></path>
                      </svg>
                    </button>
                  </a>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {projects.map((project, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 w-80 bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:bg-gray-800/70 hover:scale-105 transition-all duration-300 group"
                >
                  <h3 className="text-2xl font-bold mb-6 group-hover:text-blue-400 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-8 text-sm">
                    {project.description}
                  </p>
                  <a href="">
                    <button className="bg-transparent border border-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 hover:border-white transition-all duration-200 flex items-center group-hover:scale-105">
                      Learn More
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="ml-2"
                      >
                        <path d="m7 17 10-10"></path>
                        <path d="M7 7h10v10"></path>
                      </svg>
                    </button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="max-w-6xl mx-auto text-center w-full">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 leading-tight">
            GOT SOMETHING INTERESTING??
            <br />
            TELL ME...
          </h2>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <a
              href="mailto:rishit.gupta2204@gmail.com"
              className="bg-transparent border border-gray-600 text-white px-8 py-4 rounded-2xl hover:bg-gray-800 hover:scale-105 hover:border-white transition-all duration-200 flex items-center group"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mr-3 group-hover:text-blue-400 transition-colors duration-200"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/rishit-gupta-976232286/"
              className="bg-transparent border border-gray-600 text-white px-8 py-4 rounded-2xl hover:bg-gray-800 hover:scale-105 hover:border-white transition-all duration-200 flex items-center group"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mr-3 group-hover:text-blue-400 transition-colors duration-200"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              LinkedIn
            </a>
            <a
              href="https://github.com/RG2445"
              className="bg-transparent border border-gray-600 text-white px-8 py-4 rounded-2xl hover:bg-gray-800 hover:scale-105 hover:border-white transition-all duration-200 flex items-center group"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mr-3 group-hover:text-purple-400 transition-colors duration-200"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              GitHub
            </a>
            <a
              href="https://x.com/RishitG93200864"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border border-gray-600 text-white px-8 py-4 rounded-2xl hover:bg-gray-800 hover:scale-105 hover:border-white transition-all duration-200 flex items-center group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 1200 1227"
                fill="currentColor"
                className="mr-3 group-hover:text-cyan-400 transition-colors duration-200"
              >
                <path d="M747 574l437-574H888L607 392 365 0H0l466 678L29 1227h296l304-402 256 402h365z" />
              </svg>
              X
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <p className="text-gray-400 text-lg">
              Also, Tell me what to add here!
            </p>
            <a href="mailto:rishit.gupta2204@gmail.com">
              <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 hover:scale-105 transition-all duration-200 flex items-center">
                Get In Touch
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="ml-2"
                >
                  <path d="m7 17 10-10"></path>
                  <path d="M7 7h10v10"></path>
                </svg>
              </button>
            </a>
          </div>

          <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-white rounded-full opacity-30 animate-pulse"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-gray-800">
        <p className="text-gray-500">
          © 2025 Rishit Gupta. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
