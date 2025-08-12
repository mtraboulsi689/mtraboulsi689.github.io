const Spotlight = () => {
  return (
    <section id="spotlight" className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gradient-ocean">
            Research Spotlight
          </h2>
          
          {/* Video Description */}
          <div className="max-w-3xl mx-auto mb-8">
            <h3 className="text-2xl font-semibold text-primary mb-4">
              Explainer Video: LX-ST Coupled Model Development
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Watch this comprehensive explanation of my recent publication on the LX-ST coupled model development. 
              This video breaks down the complex methodologies and findings from our research on long-term 
              shoreline morphological evolution under climate change scenarios.
            </p>
            <p className="text-sm text-muted-foreground">
              Published in <span className="font-medium text-primary">Environmental Modelling & Software</span> (2025) • 
              Research conducted at <span className="font-medium text-primary">BRGM & Université Grenoble Alpes</span>
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-black rounded-lg overflow-hidden shadow-ocean aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/wZBNd7qW7dA"
              title="Research Explanation Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Spotlight;