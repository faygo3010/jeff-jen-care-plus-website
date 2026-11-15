import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCall from "@/components/FloatingCall";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import StarsBackdrop from "@/components/StarsBackdrop";

// The public site's chrome. The admin panel sits outside this group, so it
// gets neither the navbar nor the footer.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Gravity stars behind every page */}
      <StarsBackdrop />
      <ScrollProgressBar />
      <Navbar />
      {/* Content sits above the stars layer (z-0) */}
      <main className="relative z-10 flex-1">{children}</main>
      <div className="relative z-10">
        <Footer />
      </div>
      <FloatingCall />
    </>
  );
}
