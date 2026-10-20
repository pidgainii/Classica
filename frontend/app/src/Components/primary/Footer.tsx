export default function Footer() {
  return (
    <footer className="bg-[#f8f8f8] border-t border-gray-300 py-16 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Columna 1 */}
        <div>
          <h4 className="text-gray-800 uppercase tracking-wide text-sm mb-4">
            ABOUT US
          </h4>
          <ul className="space-y-2 text-xs text-gray-500">
            <li>
              <a href="#" className="hover:text-gray-800">
                • About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • Customer Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • Site Map
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • Search Terms
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • Advanced Search
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • Orders and Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Columna 2 */}
        <div>
          <h4 className="text-gray-800 uppercase tracking-wide text-sm mb-4">
            WHY BUY FROM US
          </h4>
          <ul className="space-y-2 text-xs text-gray-500">
            <li>
              <a href="#" className="hover:text-gray-800">
                • Shipping & Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • Secure Shopping
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • International Shipping
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • Affiliates
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • Group Sales
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
                • My Account
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • My Wishlist
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • My Cart
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • Checkout
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                • Log In
              </a>
            </li>
          </ul>
        </div>

        {/* Columna 4 (Newsletter) */}
        <div>
          <h4 className="text-gray-800 uppercase tracking-wide text-sm mb-4">
            EMAIL SIGNUP
          </h4>
          <div className="flex mt-2">
            <input
              type="email"
              placeholder="Please, enter your e-mail"
              className="w-full border border-gray-300 px-3 py-2 text-xs outline-none focus:border-gray-400 bg-white"
            />
            <button className="bg-gray-200 border border-l-0 border-gray-300 px-3 text-xs hover:bg-gray-300 transition-colors">
              <span className="opacity-0">▶</span>{" "}
              {/* Puedes poner un pequeño icono de flecha aquí */}
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto mt-16 pt-4 text-xs text-gray-400">
        © 2026 Magento Demo Store. All Rights Reserved.
      </div>
    </footer>
  );
}
