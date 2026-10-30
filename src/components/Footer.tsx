import { Link } from "react-router-dom";
import { SEO_CATEGORY_PAGES } from "@/lib/seo";

export const Footer = () => {
  return (
    <>
      <footer className="border-t border-border/60 bg-background mt-12 py-10 px-4 lg:px-16">
        <div className="max-w-6xl mx-auto space-y-8">
          <section className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              Discover Movies &amp; TV Shows with ManyFlix
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Explore movies, TV shows, anime, and curated collections. Browse by category or open any title for its synopsis, ratings, and recommendations.
            </p>
          </section>

          <nav aria-label="Browse categories" className="border-t border-border pt-6">
            <h3 className="text-sm font-medium text-foreground text-center mb-4">
              Popular categories
            </h3>
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
              {SEO_CATEGORY_PAGES.map((cat) => (
                <li key={cat.path}>
                  <Link
                    to={cat.path}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {cat.h1}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/movies"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  All Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/tv-shows"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  All TV Shows
                </Link>
              </li>
            </ul>
          </nav>

          <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Learn more on our{" "}
            <Link
              to="/about"
              className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              About ManyFlix
            </Link>{" "}
            page.
          </p>

          <div className="border-t border-border pt-6">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link
                to="/disclaimer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Disclaimer
              </Link>
              <Link
                to="/about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About ManyFlix
              </Link>
              <a
                href="/sitemap.xml"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
