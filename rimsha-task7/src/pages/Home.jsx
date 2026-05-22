function Home() {
  return (
    // Main hero section (full page background)
    <div className="bg-linear-to-r from-black via-zinc-900 to-emerald-950 text-white">
      {/* Hero content container */}
      <div className="text-center py-28 px-6">
        {/* Company name */}
        <h1 className="text-6xl font-bold text-emerald-400">EventSphere</h1>

        {/* Tagline */}
        <p className="mt-6 text-xl text-gray-300">
          Your Gateway to Live Events & Experiences
        </p>

        {/* Description */}
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          EventSphere is a modern event discovery and management platform where
          users can explore upcoming events, view details, and register for
          experiences in just a few clicks.
        </p>
      </div>

      {/* Services section */}
      <div className="grid md:grid-cols-3 gap-6 px-10 pb-20">
        {/* Service 1 */}
        <div className="bg-zinc-900 p-6 rounded-xl border border-emerald-500">
          <h2 className="text-xl font-bold text-emerald-400">
            Event Discovery
          </h2>

          <p className="mt-3 text-gray-400">
            Explore a wide range of upcoming events including workshops,
            seminars, concerts and meetups.
          </p>
        </div>

        {/* Service 2 */}
        <div className="bg-zinc-900 p-6 rounded-xl border border-emerald-500">
          <h2 className="text-xl font-bold text-emerald-400">
            Easy Registration
          </h2>

          <p className="mt-3 text-gray-400">
            Register for events quickly with a simple and user-friendly process.
          </p>
        </div>

        {/* Service 3 */}
        <div className="bg-zinc-900 p-6 rounded-xl border border-emerald-500">
          <h2 className="text-xl font-bold text-emerald-400">
            Event Information
          </h2>

          <p className="mt-3 text-gray-400">
            View complete event details including description, timing and
            participation info.
          </p>
        </div>
      </div>

      {/* Why choose section */}
      <div className="text-center pb-20 px-6">
        {/* Section title */}
        <h2 className="text-3xl font-bold text-emerald-400">Why EventSphere</h2>

        {/* Description */}
        <p className="mt-6 text-gray-400 max-w-3xl mx-auto">
          EventSphere brings all events into one place so users don’t have to
          search multiple platforms. It provides a simple, fast and organized
          way to stay updated with live events and opportunities.
        </p>
      </div>
    </div>
  );
}

// Export Home page
export default Home;
