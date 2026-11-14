import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCall from "@/components/FloatingCall";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import StarsBackdrop from "@/components/StarsBackdrop";

// The public site's chrome. The admin panel sits outside this group, so it
// gets neither the navbar nor the footer.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingCall />
      {/* Gravity stars over every page and section */}
      <StarsBackdrop />
    </>
  );
}
