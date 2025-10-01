import CartFlotingButton from "@/components/Cart/CartFlotingButton";
import ChatWrapper from "@/components/Chat/ChatWrapper";
import Footer from "@/components/navigations/Footer";
import Navbar from "@/components/navigations/Navbar";
import WishlistFloatingButton from "@/components/Wishlist/WishlistFlotingButton";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer></Footer>
      <CartFlotingButton />
      <WishlistFloatingButton />
      <ChatWrapper />
    </>
  );
}