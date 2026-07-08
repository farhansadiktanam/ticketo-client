import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function MainLaout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="grow flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
