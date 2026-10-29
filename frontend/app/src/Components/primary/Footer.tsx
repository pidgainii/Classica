export default function Footer() {
  return (
    <footer className="bg-[#f0ece1] border-t border-gray-300 py-16 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Columna 1 */}
        <div>
          <h4 className="text-gray-800 uppercase tracking-wide text-sm mb-4">
            TECHNOLOGICAL STACK
          </h4>
          <ul className="space-y-2 text-xs text-gray-500">
            <li>
              <a href="#" className="hover:text-gray-800">
                • Frontend
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • Backend
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • Database
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • Other
              </a>
            </li>
          </ul>
        </div>

        {/* Columna 2 */}
        <div>
          <h4 className="text-gray-800 uppercase tracking-wide text-sm mb-4">
            SOFTWARE PRACTICES
          </h4>
          <ul className="space-y-2 text-xs text-gray-500">
            <li>
              <a href="#" className="hover:text-gray-800">
                • Authentication
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • Route Protection
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • Pagination
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • State Persistence
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • Components
              </a>
            </li>
          </ul>
        </div>

        {/* Columna 3 */}
        <div>
          <h4 className="text-gray-800 uppercase tracking-wide text-sm mb-4">
            MY ACCOUNT
          </h4>
          <ul className="space-y-2 text-xs text-gray-500">
            <li>
              <a href="#" className="hover:text-gray-800">
                • Profile
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • My Library
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • My Posts
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • Settings
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • Log In
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • Register
              </a>
            </li>
          </ul>
        </div>

        {/* Columna 4 (Newsletter) */}
        <div>
          <h4 className="text-gray-800 uppercase tracking-wide text-sm mb-4">
            LOG IN
          </h4>
          <div className="flex mt-2">
            <input
              type="email"
              placeholder="Please, enter your e-mail"
              className="w-full border border-gray-300 px-3 py-2 text-xs outline-none focus:border-gray-400 bg-white"
            />
            <button className="bg-gray-200 border border-l-0 border-gray-300 px-3 text-xs hover:bg-gray-300 transition-colors">
              <span className="opacity-40">▶</span>{" "}
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto mt-16 pt-4 text-xs text-gray-400">
        © 2026 Yevgen Petronyuk Pidhaynyy. All Rights Reserved.
      </div>
    </footer>
  );
}
