interface ErrorProps {
  message?: string;
}

export default function Error({
  message = "Error al cargar los libros.",
}: ErrorProps) {
  return (
    <div className="w-full bg-[#f0ece1] py-32 flex flex-col items-center justify-center border-t border-[#e6decb] text-center px-4">
      <p className="font-serif text-sm tracking-widest uppercase text-[#8a4a42] mb-2">
        System Error
      </p>
      <p className="text-xs font-sans text-[#5a4a42]">{message}</p>
    </div>
  );
}
