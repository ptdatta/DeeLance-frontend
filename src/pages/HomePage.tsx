import WelcomeBanner from "components/WelcomeBanner";
import Tasks from "sections/MyProfilePage/overview/Tasks";
import Typography from "components/Typography";
import { FaCode, FaDesktop, FaPencilAlt, FaCamera, FaChartLine, FaLanguage } from "react-icons/fa";
import { Link } from "react-router-dom";

function HomePage() {
  const categories = [
    { icon: <FaCode />, title: "Programming & Tech", count: "1.2k+ Services", path: "/category/programming" },
    { icon: <FaDesktop />, title: "Design & Creative", count: "850+ Services", path: "/category/design" },
    { icon: <FaPencilAlt />, title: "Writing & Translation", count: "600+ Services", path: "/category/writing" },
    { icon: <FaCamera />, title: "Video & Animation", count: "450+ Services", path: "/category/video" },
    { icon: <FaChartLine />, title: "Digital Marketing", count: "700+ Services", path: "/category/marketing" },
    { icon: <FaLanguage />, title: "Language Services", count: "300+ Services", path: "/category/language" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-woodsmoke-950">
      <div className="container-wrapper space-y-12 py-8">
        {/* Welcome Banner */}
        <div className="mb-10">
          <WelcomeBanner />
        </div>

        {/* Popular Categories */}
        <section>
          <Typography variant="2xl" className="font-semibold mb-6">
            Popular Categories
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={category.path}
                className="bg-white dark:bg-woodsmoke-900 rounded-xl p-6 transition-transform hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl text-green-haze-500">
                    {category.icon}
                  </div>
                  <div>
                    <Typography variant="lg" className="font-medium mb-1">
                      {category.title}
                    </Typography>
                    <Typography variant="sm" className="text-gray-600 dark:text-gray-400">
                      {category.count}
                    </Typography>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Tasks */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <Typography variant="2xl" className="font-semibold">
              Featured Tasks
            </Typography>
            <Link 
              to="/tasks" 
              className="text-green-haze-500 hover:text-green-haze-600 font-medium"
            >
              View All →
            </Link>
          </div>
          <Tasks className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4" />
        </section>

        {/* Why Choose Us */}
        <section className="bg-white dark:bg-woodsmoke-900 rounded-xl p-8">
          <Typography variant="2xl" className="font-semibold mb-8 text-center">
            Why Choose DeeLance?
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Secure Payments",
                description: "Protected payments for every transaction",
                icon: "🔒"
              },
              {
                title: "Quality Work",
                description: "Access top talent and professional work",
                icon: "⭐"
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock assistance for any concern",
                icon: "💬"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <Typography variant="lg" className="font-medium mb-2">
                  {feature.title}
                </Typography>
                <Typography variant="sm" className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </Typography>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
