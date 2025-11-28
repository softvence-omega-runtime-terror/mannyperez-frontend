import { useAppSelector } from "@/store/hooks";
import BuyerLivesPage from "./BuyerLivesPage";
import SellerLivesPage from "./SellerLivesPage";

function LivePage() {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) return <div>Loading...</div>;

  if (user.role === "buyer") return <BuyerLivesPage />;
  if (user.role === "seller") return <SellerLivesPage />;
}

export default LivePage;
