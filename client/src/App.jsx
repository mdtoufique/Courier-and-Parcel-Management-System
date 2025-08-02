import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import Footer from './components/Footer.jsx';
import Header from "./components/Header.jsx";

function App() {
  
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-center" />
      <Header />
      
      <main className="bg-[#f6f6e9] flex-1">
        <AppRoutes />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
