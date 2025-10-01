import "./globals.css";
import { ThemeProvider } from "../components/reusable-components/ThemeProvider";
import { appConfiguration } from "@/utils/constant/appConfiguration";
import Providers from "../hooks/Providers";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/hooks/CartContext";
import { WishlistProvider } from "@/hooks/WishlistContext";
import { ChatProvider } from "@/hooks/ChatContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`} suppressHydrationWarning={true}>
        <Providers>
          <ThemeProvider
            defaultTheme="light"
            storageKey={`${appConfiguration.appCode}theme`}>
            <CartProvider>
              <WishlistProvider>
                <ChatProvider>
                  {children}
                </ChatProvider>
              </WishlistProvider>
            </CartProvider>
          </ThemeProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}