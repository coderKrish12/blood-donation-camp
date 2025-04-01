import Image from "next/image";

export default function Header() {
  return (
    <header className="px-4 py-2 flex justify-between items-center shadow-md">
      <div className="flex items-center justify-between gap-2 text-black font-libre">
        <Image
          src="/bloodDCLogo.jpg"
          alt="logo"
          width={60}
          height={60}
          className=""
        />
        <div className="flex items-center flex-col justify-center">
          <h1 className="text-3xl font-bold ">MALLAPUR</h1>
          <p className="text-xl"> HELPING HANDS</p>
        </div>
      </div>
      <nav className="space-x-6 text-sm md:text-base"></nav>
    </header>
  );
}
