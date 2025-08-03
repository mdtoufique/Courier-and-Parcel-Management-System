import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import Footer from './components/Footer.jsx';
import Header from "./components/Header.jsx";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    function setVh() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);
  return (
    <div style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }} className="flex flex-col">
      <Toaster position="top-center" />
      <Header />
      
      <main className="bg-[#f6f6e9] flex-1 overflow-x-auto">
        <AppRoutes />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
