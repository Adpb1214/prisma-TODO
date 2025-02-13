const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>© {new Date().getFullYear()} To-Do App. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  