import { Link } from 'react-router-dom';

const AboutPage = () => (
  <div className="px-4 lg:px-16">
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">About ManyFlix</h1>
      <p className="text-muted-foreground mb-10 max-w-3xl">
        ManyFlix is a movie and television discovery experience built to make browsing
        collections, exploring genres, and finding your next watch simple.
      </p>

      <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Explore your way</h2>
          <p>
            Browse trending titles, new releases, popular picks, and themed collections.
            Search for a title or open its detail page to see metadata, ratings, trailers,
            seasons, and related recommendations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Made for your devices</h2>
          <p>
            ManyFlix adapts to desktop, mobile, tablet, and TV-sized screens. Profiles,
            watch history, and personal lists are stored locally in your browser.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Catalog information</h2>
          <p>
            Movie and television metadata and artwork are provided by TMDB. ManyFlix is
            not endorsed or certified by TMDB. Third-party media availability depends on
            the services configured by the operator.
          </p>
        </section>

        <p>
          <Link to="/disclaimer" className="text-foreground underline underline-offset-4 hover:text-primary">
            Read the disclaimer
          </Link>
          {' · '}
          <Link to="/browse" className="text-foreground underline underline-offset-4 hover:text-primary">
            Start browsing
          </Link>
        </p>
      </div>
    </div>
  </div>
);

export default AboutPage;
