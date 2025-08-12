
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Publications from '@/components/Publications';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Skills />
      <Projects />
      <Publications />
      <Experience />
      <Education />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
