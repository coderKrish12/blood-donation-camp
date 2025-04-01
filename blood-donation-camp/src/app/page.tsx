import Header from "@/components/Header";
import RegistrationForm from "@/components/RegistrationForm";
import EventInfo from "@/components/EventInfo";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f9f9f9]">
      <Header />

      <div className="max-w-[90rem] mx-auto px-6 py-10 grid md:grid-cols-2 gap-12 items-start">
        <div className="bg-white shadow-xl rounded-xl p-8">
          <RegistrationForm />
        </div>
        <div className="rounded-xl p-8 py-0">
          <EventInfo />
        </div>
      </div>
      <div className="max-w-[90rem] mx-auto px-6 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold font-libre">Organised By</h1>
        <div className=" grid md:grid-cols-4 grid-cols-1 space-y-2 md:space-y-0 w-full my-6">
          <div className="flex flex-col items-center justify-center font-libre">
            <p className="text-xl font-bold">Vamshi Bollampally</p>
            <p>6301749005</p>
          </div>
          <div className="flex flex-col items-center justify-center font-libre">
            <p className="text-xl font-bold">Vijay Kattherapally</p>
            <p>9346553824</p>
          </div>
          <div className="flex flex-col items-center justify-center font-libre">
            <p className="text-xl font-bold">Gyaneshwar Alwala</p>
            <p>7093133413</p>
          </div>
          <div className="flex flex-col items-center justify-center font-libre">
            <p className="text-xl font-bold">Konda Sai Krishna</p>
            <p>8074769567</p>
          </div>
        </div>
      </div>
    </main>
  );
}
