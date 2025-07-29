import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import Footer from './components/Footer.jsx'
import Header from "./components/Header.jsx";
function App() {
  return (
  <>
  <Toaster position="top-center" />
  <Header/>
  <AppRoutes />
  <Footer/>
  </>
  );
}

export default App;
