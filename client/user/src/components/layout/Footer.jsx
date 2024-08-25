const Footer = () => {
  return (
    <footer className="bg-base-200 py-4 text-center">
      <p>&copy; {new Date().getFullYear()} TurfSpot. All rights reserved.</p>
      <p>
        Developed with ❤ by{" "}
        <a
          href="https://github.com/RijoKsd"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Rijo Sebastian
        </a>
      </p>
    </footer>
  );
};

export default Footer;
