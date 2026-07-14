export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <h2 className="text-2xl font-bold text-blue-900">
          Strong Tower Concepts
        </h2>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 font-medium">
          <a href="#" className="hover:text-blue-700 transition">Home</a>
          <a href="#" className="hover:text-blue-700 transition">Services</a>
          <a href="#" className="hover:text-blue-700 transition">Properties</a>
          <a href="#" className="hover:text-blue-700 transition">About</a>
          <a href="#" className="hover:text-blue-700 transition">Contact</a>
        </div>

      </div>
    </nav>
  );
}