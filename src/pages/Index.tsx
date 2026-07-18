
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhatIDo from '@/components/WhatIDo';
import Spotlight from '@/components/Spotlight';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Publications from '@/components/Publications';
import Experience from '@/components/Experience';
import LinkedInFeed from '@/components/LinkedInFeed';
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
      <Skills />
      <Projects />
      <Publications />
      <Experience />
      <LinkedInFeed />
      <Education />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
