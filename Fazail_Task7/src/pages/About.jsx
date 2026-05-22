import {
  FaDumbbell,
  FaBullseye,
  FaMobileAlt,
  FaUsers,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About <span className="text-lime-400">IRON</span>TRACK
        </h1>

        <p className="max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed">
          IronTrack is designed to help people stay active, healthy, and
          motivated. Whether you're just starting your fitness journey or
          looking to push your limits, our platform provides workouts,
          resources, and inspiration to help you achieve your goals.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-8 mb-20">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center hover:border-lime-400 transition">
          <h2 className="text-2xl font-bold text-lime-400 mb-4">
            Our Mission
          </h2>

          <p className="text-gray-300 leading-relaxed">
            To make fitness accessible to everyone through quality workout
            resources, motivation, and guidance that encourage a healthier
            lifestyle.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center hover:border-lime-400 transition">
          <h2 className="text-2xl font-bold text-lime-400 mb-4">
            Our Vision
          </h2>

          <p className="text-gray-300 leading-relaxed">
            To build a global fitness community where people can grow stronger,
            stay consistent, and achieve their personal health goals.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose <span className="text-lime-400">IRON</span>TRACK?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center hover:border-lime-400 hover:-translate-y-1 transition-all">
            <FaDumbbell className="text-5xl text-lime-400 mx-auto mb-4" />

            <h3 className="text-xl font-semibold mb-3 text-white">
              Workout Library
            </h3>

            <p className="text-gray-300">
              Access a collection of workouts designed for strength, cardio,
              flexibility, and endurance training.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center hover:border-lime-400 hover:-translate-y-1 transition-all">
            <FaBullseye className="text-5xl text-lime-400 mx-auto mb-4" />

            <h3 className="text-xl font-semibold mb-3 text-white">
              Goal Tracking
            </h3>

            <p className="text-gray-300">
              Set goals, track progress, and stay motivated with measurable
              fitness achievements.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center hover:border-lime-400 hover:-translate-y-1 transition-all">
            <FaMobileAlt className="text-5xl text-lime-400 mx-auto mb-4" />

            <h3 className="text-xl font-semibold mb-3 text-white">
              Anytime Access
            </h3>

            <p className="text-gray-300">
              Train wherever you are with a fully responsive platform built for
              desktop, tablet, and mobile devices.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-zinc-900 rounded-2xl p-6 text-center border border-zinc-800">
            <h3 className="text-4xl font-bold text-lime-400">500+</h3>
            <p className="text-gray-300 mt-2">Workouts</p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6 text-center border border-zinc-800">
            <h3 className="text-4xl font-bold text-lime-400">10K+</h3>
            <p className="text-gray-300 mt-2">Users</p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6 text-center border border-zinc-800">
            <h3 className="text-4xl font-bold text-lime-400">100+</h3>
            <p className="text-gray-300 mt-2">Guides</p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6 text-center border border-zinc-800">
            <FaUsers className="text-4xl text-lime-400 mx-auto mb-2" />
            <p className="text-gray-300">Fitness Community</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Start Your Fitness Journey Today
        </h2>

        <p className="text-gray-300 max-w-2xl mx-auto mb-6">
          Join thousands of fitness enthusiasts and discover workouts that help
          you become stronger, healthier, and more confident every day.
        </p>

        <a href="/workouts" className="bg-lime-500 hover:bg-lime-400 text-black font-semibold px-8 py-3 rounded-xl transition">
          Explore Workouts
        </a>
      </section>
    </div>
  );
};

export default About;