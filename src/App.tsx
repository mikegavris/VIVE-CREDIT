import ScrollToTop from "@/components/ScrollToTop";
import CookieBanner from "@/components/CookieBanner";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <ScrollToTop />
      <CookieBanner />

      <AppRoutes />
    </>
  );
}

export default App;
