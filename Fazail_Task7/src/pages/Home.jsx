import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-black text-white min-h-screen">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold">
          Welcome to
          <span className="text-lime-400"> IRON</span>TRACK
        </h1>

        <p className="text-gray-400 text-lg md:text-xl mt-6 max-w-2xl mx-auto">
          Track workouts, monitor progress, and stay consistent with your
          fitness goals.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Link
            to="/workouts"
            className="bg-lime-500 hover:bg-lime-400 text-black font-semibold px-8 py-3 rounded-xl transition"
          >
            Start Tracking
          </Link>

          <Link
            to="/about"
            className="border border-zinc-700 hover:border-lime-400 px-8 py-3 rounded-xl transition"
          >
            Learn More
          </Link>
        </div>

        {/* Hero Image/Card */}
        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-4xl h-100 rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
              alt="Gym"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-lime-400 transition">
            <h3 className="text-2xl font-semibold mb-3">
              Workout Tracking
            </h3>
            <p className="text-gray-400">
              Save exercises, sets, reps and workout history.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-lime-400 transition">
            <h3 className="text-2xl font-semibold mb-3">
              Progress Monitoring
            </h3>
            <p className="text-gray-400">
              Track improvement and analyze your performance.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-lime-400 transition">
            <h3 className="text-2xl font-semibold mb-3">
              Fitness Goals
            </h3>
            <p className="text-gray-400">
              Set goals and stay motivated throughout your journey.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;