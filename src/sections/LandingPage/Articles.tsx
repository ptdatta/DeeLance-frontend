import ArticleCard from "components/ArticleCard";
import { FaExternalLinkAlt } from "react-icons/fa";

function Articles() {
  return (
    <section className="container-wrapper">
      <div className="grid max-lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid-cols-3 gap-6 mb-10">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />

        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>

      <a
        href="/"
        className="text-green-haze-600 flex items-center space-x-2 mx-auto w-fit"
      >
        <span>View more</span> <FaExternalLinkAlt className="inline-block" />
      </a>
    </section>
  );
}

export default Articles;
