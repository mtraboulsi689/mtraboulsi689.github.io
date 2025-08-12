const Spotlight = () => {
  return (
    <section id="spotlight" className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-ocean">
            Research Spotlight
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-black rounded-lg overflow-hidden shadow-ocean">
            <video
              className="w-full h-auto"
              controls
              poster="/placeholder.svg"
            >
              <source src="/lxst_explainer.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Spotlight;