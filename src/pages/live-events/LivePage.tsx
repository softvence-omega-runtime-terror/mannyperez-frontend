import { useAppSelector } from "@/store/hooks";
import BuyerLivesPage from "./BuyerLivesPage";
import SellerLivesPage from "./SellerLivesPage";
import { Navigate } from "react-router-dom";

function LivePage() {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user?.role === "buyer") return <BuyerLivesPage />;
  if (user?.role === "seller") return <SellerLivesPage />;
}

export default LivePage;
