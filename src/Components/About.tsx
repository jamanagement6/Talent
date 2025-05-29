import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gray-100" id="about">
      {/* Mission Section */}
      <section className="py-16 px-6 text-center max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
        <p className="text-gray-600 text-lg">
          We are dedicated to bridging the gap between job seekers, service
          providers, businesses, and customers. Our platform ensures seamless
          connections, fostering growth and success.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-12">
            Why Choose Us?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center">
              <span className="text-3xl">💼</span>

              <h4 className="text-lg font-semibold">
                Endless Job Opportunities
              </h4>
              <p className="text-gray-600 mt-2">
                Explore diverse career options across multiple industries.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center">
              <span className="text-3xl">🔅</span>
              <h4 className="text-lg font-semibold">Quality Services</h4>
              <p className="text-gray-600 mt-2">
                Find trusted service providers ready to meet your needs.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center">
              <span className="text-3xl">🤝</span>

              <h4 className="text-lg font-semibold">
                Verified Products & Goods
              </h4>
              <p className="text-gray-600 mt-2">
                Discover a marketplace filled with high-quality products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-500 text-white py-16 text-center">
        <h3 className="text-2xl font-bold mb-4">Start Connecting Today</h3>
        <p className="text-lg mb-6">
          Join thousands of users who have found jobs, services, and products on
          our platform.
        </p>
        <Link
          to="/signup"
          className="bg-white text-blue-500 px-6 py-3 rounded-lg text-lg hover:bg-gray-200 transition"
        >
          Sign Up Now
        </Link>
      </section>
    </div>
  );
};

export default About;
