import Navbar from "./components/Navbar";
import StudentCard from "./components/StudentCard";
import Counter from "./components/Counter";
import Announcement from "./components/Announcments";
import Footer from "./components/Footer";

function App() {
  const students = [
    {
      id: 1,
      name: "Ali Khan",
      class: "10th",
      roll: 101,
      image:
        "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Sara Ahmed",
      class: "9th",
      roll: 102,
      image:
        "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Usman Tariq",
      class: "8th",
      roll: 103,
      image:
        "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "Ayesha Noor",
      class: "7th",
      roll: 104,
      image:
        "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 5,
      name: "Hamza Ali",
      class: "6th",
      roll: 105,
      image:
        "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          School Dashboard
        </h1>

        {/* Student Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {students.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>

        {/* Counter */}
        <div className="mt-10">
          <Counter />
        </div>

        {/* Announcement */}
        <div className="mt-10">
          <Announcement />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;