export default function Loading() {
  return (
    <div className="w-full bg-[#f0ece1] py-32 flex flex-col items-center justify-center border-t border-[#e6decb]">
      <div className="w-8 h-8 border-2 border-[#5a4a42] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-serif tracking-widest text-xs uppercase text-[#5a4a42]">
        Loading...
      </p>
    </div>
  );
}
