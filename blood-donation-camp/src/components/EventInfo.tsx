import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";

export default function EventInfo() {
  return (
    <div id="home" className="space-y-3 text-center">
      <h2 className="text-2xl font-bold text-gray-800 font-libre">
        MALLAPUR HELPING HANDS
      </h2>
      <p className="text-2xl font-semibold"> PRESENTS</p>
      <div className="flex items-center gap-2 justify-center">
        <Image src="/bloodDrop.png" alt="logo" width={100} height={150} />
        <div className="font-libre">
          <h3 className="text-5xl text-red-600 font-bold">BLOOD</h3>
          <h3 className="text-3xl font-semibold"> DONATION</h3>
        </div>
        <Image src="/bloodDrop.png" alt="logo" width={100} height={150} />
      </div>
      <p className="italic text-xl text-gray-600">
        A drop for you, a life for someone
      </p>

      <div className="gap-4 mt-4 grid grid-cols-2">
        <div className="bg-white border px-4 py-2 rounded-lg shadow-sm text-xl flex items-center flex-col justify-center">
          <p className="font-semibold">In Association With</p>
          <p>MSN Blood Centre</p>
        </div>
        <div className="bg-white border px-4 py-2 pl-8 rounded-lg shadow-sm  text-xl flex flex-col justify-center">
          <p className="font-semibold flex text-md text-start">
            <IoCalendarOutline className="mt-1.5 mr-2" />
            5th April 2025
          </p>
          <a
            href="https://maps.app.goo.gl/boiQS5bR2cfYv5H96"
            className="flex text-md text-start"
          >
            <FaLocationDot className="mt-1.5 mr-2" />
            Koundinya Bhavan, Mallapur
          </a>
          <p className="flex text-md text-start mt-1">
            <FaRegClock className="mt-1.5 mr-2" /> 04:00 PM - 08:00 PM
          </p>
        </div>
      </div>

      <p className="text-lg italic font-semibold text-gray-800">
        Be a Lifesaver. Donate Blood!
      </p>
      <div className="flex flex-col items-center justify-center">
        <Image src="/locationQR.jpg" alt="logo" width={250} height={250} />
        <p>
          Scan the QR code to find us / Click on location above. Save a Life !
        </p>
        <p>Join us in making a difference</p>
      </div>
    </div>
  );
}
