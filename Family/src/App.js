import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { Catalog } from "./pages/Catalog/Catalog";
import { Product } from "./pages/Product/Product";
import { Order } from "./pages/Order/Order";
import AppContextProvider from "./context/AppContext";
import { SearchResult } from "./pages/SearchResult/SearchResult";
import { AboutPoizon } from "./pages/AboutPoizon/AboutPoizon";
import { Faq } from "./pages/Faq/Faq";
import { Contacts } from "./pages/Contacts/Contacts";
import { Delivery } from "./pages/Delivery/Delivery";
import { Liked } from "./pages/Liked/Liked";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { Payment } from "./pages/Payment/Payment";

function App() {
  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <AppContextProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Order />} />
          <Route path="/liked" element={<Liked />} />
          <Route path="/about" element={<AboutPoizon />} />
          <Route path="/questions" element={<Faq />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/products" element={<Catalog />} />
          <Route path="/result" element={<SearchResult />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/product/:productId" element={<Product />} />
        </Routes>
      </AppContextProvider>
    </div>
  );
}

export default App;
