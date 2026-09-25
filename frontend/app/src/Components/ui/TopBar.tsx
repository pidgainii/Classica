export default function TopBar() {
  return (
    <div className="bg-[#2a2a2a] text-gray-300 text-xs py-2 px-6 flex flex-col sm:flex-row justify-between items-center">
      <div className="tracking-wide">DEFAULT WELCOME MSG!</div>
      <div className="flex items-center space-x-4 mt-2 sm:mt-0 uppercase tracking-wider">
        <a
          href="#"
          className="hover:text-white transition-colors text-[#5bb6c7]"
        >
          MY ACCOUNT
        </a>
        <a href="#" className="hover:text-white transition-colors text-white">
          MY WISHLIST
        </a>
        <a href="#" className="hover:text-white transition-colors text-white">
          MY CART
        </a>
        <a href="#" className="hover:text-white transition-colors text-white">
          CHECKOUT
        </a>
        <a href="#" className="hover:text-white transition-colors text-white">
          LOG IN
        </a>
        <div className="flex items-center ml-4 space-x-2">
          <span className="text-gray-400 capitalize">Currencies:</span>
          <select className="bg-white text-black px-2 py-0.5 text-xs outline-none cursor-pointer">
            <option>US Dollar</option>
            <option>Euro</option>
          </select>
        </div>
      </div>
    </div>
  );
}
