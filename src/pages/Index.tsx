import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import HowItWorks from "@/components/HowItWorks";
import AdministrationsSection from "@/components/AdministrationsSection";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";
import ChatAssistant from "@/components/ChatAssistant";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <Hero />
        <SearchSection />
        <HowItWorks />
        <AdministrationsSection />
        <TrustSection />
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default Index;
