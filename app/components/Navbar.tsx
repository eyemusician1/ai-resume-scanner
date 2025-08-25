import { Link } from "react-router"

const Navbar = () => {
  return (
    <nav className="navbar">
        <Link to="/">
            <p className="text-2xl max-sm:text-xl font-bold text-gradient">ResuMe</p>
        </Link>
        <Link to="/upload" className="primary-button w-fit max-sm:px-4 max-sm:py-2 max-sm:text-sm">
            Upload Resume
        </Link>
    </nav>
  )
}

export default Navbar