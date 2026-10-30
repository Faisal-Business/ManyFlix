const Disclaimer = () => {
  return (
    <div className="px-4 lg:px-16">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>
        
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <p>
            ManyFlix is a discovery interface for movies and television. Catalog metadata and artwork are provided by TMDB; playback, when available, may be provided by third-party services that are not controlled by ManyFlix.
          </p>
          
          <p>
            ManyFlix does not claim ownership of third-party content and cannot control the availability, policies, or removal processes of external services.
          </p>
          
          <p>
            Rights-related issues involving third-party material must be handled through the relevant hosting service's own procedures. ManyFlix does not host or control that material and cannot remove it from an external service.
          </p>
          
          <p>
            ManyFlix does not endorse copyright infringement. Users are responsible for following applicable laws and third-party terms when using external services.
          </p>
          
          <p>
            ManyFlix makes no warranties regarding the accuracy, reliability, or legality of third-party content. Users access external services at their own risk.
          </p>
          
          <p>
            ManyFlix does not guarantee the availability or quality of third-party content. External services may change or become unavailable without notice.
          </p>
          
          <p>
            Users are responsible for ensuring that their use of ManyFlix and any third-party services complies with applicable laws and regulations.
          </p>
          
          <p>
            We reserve the right to update, modify, or amend this disclaimer at any time without prior notice. Users are encouraged to review this page periodically to stay informed about any changes to our policies.
          </p>
          
          <p>
            Content removal requests for third-party material are governed by the procedures of the service hosting that material.
          </p>
          
          <p className="font-semibold">
            Use ManyFlix responsibly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
