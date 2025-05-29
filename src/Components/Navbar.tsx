const Navbar = ({ isLoggedIn, Logout }: { isLoggedIn: boolean, Logout: ()=>void }) => {
  return (
    <nav className="bg-blue-950 p-4 text-white flex justify-between">
      <a href="/" className="text-lg font-bold">
        Talent
      </a>
      <div className="space-x-4">
        {!isLoggedIn && (
          <a href="/login" className="no-underline">
            Login
          </a>
        )}
        {!isLoggedIn && (
          <a href="/signup" className="">
            Sign Up
          </a>
        )}
        {isLoggedIn && (
          <a href="/"  className="" onClick={Logout}>
            Log Out
          </a>
        )}
        <a href="#about" className="">
          About
        </a>
        <a href="/login" className="">
          Home
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
