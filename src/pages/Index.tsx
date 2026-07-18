
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhatIDo from '@/components/WhatIDo';
import Spotlight from '@/components/Spotlight';
import Experience from '@/components/Experience';
import Publications from '@/components/Publications';
import Projects from '@/components/Projects';
import LinkedInFeed from '@/components/LinkedInFeed';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <WhatIDo />
      <Spotlight />
      <Experience />
      <Publications />
      <Projects />
      <LinkedInFeed />
      <Skills />
      <Education />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
