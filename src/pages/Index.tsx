
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Spotlight from '@/components/Spotlight';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import AllProjects from '@/components/AllProjects';
import Publications from '@/components/Publications';
import Presentations from '@/components/Presentations';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Spotlight />
      <Skills />
      <Projects />
      <AllProjects />
      <Publications />
      <Presentations />
      <Experience />
      <Education />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
