function About() {
  return (
    // Main container
    <div className="bg-black text-white min-h-screen px-8 py-16">
      {/* Top heading section */}
      <div className="text-center mb-16">
        {/* Main title */}
        <h1 className="text-5xl font-bold text-emerald-400">
          About EventSphere
        </h1>

        {/* Short tagline */}
        <p className="mt-4 text-gray-400 text-lg">
          A smart platform for discovering and managing events
        </p>
      </div>

      {/* What platform does */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">What is EventSphere?</h2>

        <p className="text-gray-300 leading-7">
          EventSphere is an online event management platform where users can
          explore upcoming events, view complete event details, and register
          themselves for participation.
          <br />
          <br />
          It helps users stay updated with different events like workshops,
          seminars, concerts, and community gatherings in one place.
        </p>
      </div>

      {/* Purpose section */}
      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-4">Our Purpose</h2>

        <p className="text-gray-300 leading-7">
          The main purpose of EventSphere is to make event discovery and
          registration simple, fast, and accessible for everyone.
          <br />
          <br />
          Instead of searching events on different platforms, users can find all
          events in one organized system.
        </p>
      </div>

      {/* Features section */}
      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-4">Key Features</h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Browse upcoming events easily</li>

          <li>View full event details</li>

          <li>Register for events with one click</li>

          <li>Track number of registrations</li>

          <li>Simple and user-friendly interface</li>
        </ul>
      </div>

      {/* Benefits section */}
      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-4">Why EventSphere?</h2>

        <p className="text-gray-300 leading-7">
          EventSphere saves time and improves event participation by providing a
          centralized platform for all event-related activities. It is designed
          for students, professionals, and event organizers.
        </p>
      </div>
    </div>
  );
}

// Export About page
export default About;
