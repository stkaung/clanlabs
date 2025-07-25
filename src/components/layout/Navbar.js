import Link from "next/link";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/experiences">
            <a className="nav-link">Experiences</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
