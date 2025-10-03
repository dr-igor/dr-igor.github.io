function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-neutral-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-700 via-purple-600 to-amber-600 dark:from-purple-400 dark:via-purple-300 dark:to-amber-400 bg-clip-text text-transparent" style={{ fontFamily: "'Anta', sans-serif" }}>
          About Me
        </h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Welcome to Igor Labworks - a creative space where technology meets art and design.
          </p>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            I'm Igor Petrik, a multidisciplinary maker passionate about exploring the intersection of:
          </p>
          
          <ul className="text-gray-700 dark:text-gray-300 space-y-2 mb-6">
            <li>Software Engineering & Development</li>
            <li>Electronics Design & Prototyping</li>
            <li>Automation & Systems</li>
            <li>Art & Design</li>
            <li>Interior Design & Architecture</li>
            <li>Home Improvement</li>
            <li>CAD & 3D Modeling</li>
            <li>Music Production & Audio DSP</li>
            <li>Light & Color Reproduction</li>
            <li>Burning Man Projects</li>
          </ul>
          
          <p className="text-gray-700 dark:text-gray-300">
            This portfolio showcases my journey through creative technology and artistic expression. 
            Stay tuned for projects, experiments, and adventures in making.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
