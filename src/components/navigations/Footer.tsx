import { FaInstagram, FaFacebookF, FaTwitter, FaPinterestP, FaSearch } from "react-icons/fa";
import { MdLocationOn, MdEmail, MdLocalShipping } from "react-icons/md";
import { GiDiamondRing } from "react-icons/gi";
import Paragraph from "../reusable-components/Paragraph";
import Heading from "../reusable-components/Heading";
import Link from "next/link";
import Button from "../reusable-components/Button";
import InputField from "../ui/input";
import Image from "next/image";
import homeLogo from "../../../public/fashnova-logo.png";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black via-gray-900 to-black text-gray-300 relative overflow-hidden">
      {/* Luxury Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10">
          <Image
              src={homeLogo}
              alt={'Fashnova Logo'}
              width={64}
              height={64}
              className="w-12 h-12 relative"
            />
        </div>
        <div className="absolute top-20 right-20">
          <GiDiamondRing className="text-5xl text-white" />
        </div>
        <div className="absolute bottom-20 left-1/4">
          <FaSearch className="text-4xl text-white" />
        </div>
        {/* Geometric Patterns */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-white/10"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-white/10"></div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 pt-20 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        
        {/* Brand Info */}
        <div className="lg:col-span-1">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
               <Image
              src={homeLogo}
              alt={'Fashnova Logo'}
              width={64}
              height={64}
              className="w-12 h-12 relative"
            />
              <Heading className="font-light text-3xl text-white tracking-wider">FASHNOVA</Heading>
            </div>
            <Paragraph className="text-sm mb-8 text-gray-400 leading-relaxed font-light tracking-wide">
              Redefining modern elegance with curated luxury fashion. Each piece is meticulously crafted 
              for the contemporary individual who values sophistication and timeless style.
            </Paragraph>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <MdLocationOn className="text-white text-xl mt-0.5 flex-shrink-0 opacity-70" />
              <Paragraph className="text-sm text-gray-400 font-light">
                123 Luxury Avenue,<br />
                Fashion District,<br />
                Metropolitan City, 10001
              </Paragraph>
            </div>

            <div className="flex items-center gap-4">
              <MdEmail className="text-white text-xl flex-shrink-0 opacity-70" />
              <Paragraph className="text-sm text-gray-400 font-light">style@elevatefashion.com</Paragraph>
            </div>

            <div className="flex items-center gap-4">
              <MdLocalShipping className="text-white text-xl flex-shrink-0 opacity-70" />
              <Paragraph className="text-sm text-gray-400 font-light">Complimentary express shipping</Paragraph>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 mt-8">
            {[
              { icon: <FaInstagram />, color: "bg-white/10 hover:bg-white/20 border-white/20" },
              { icon: <FaFacebookF />, color: "bg-white/10 hover:bg-white/20 border-white/20" },
              { icon: <FaTwitter />, color: "bg-white/10 hover:bg-white/20 border-white/20" },
              { icon: <FaPinterestP />, color: "bg-white/10 hover:bg-white/20 border-white/20" }
            ].map((social, index) => (
              <Link 
                key={index} 
                href="#" 
                className={`${social.color} duration-500 text-white p-3 rounded-lg text-sm transform hover:scale-110 transition-all border backdrop-blur-sm`}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Fashion Collections */}
        <div>
          <Heading className="font-light mb-8 text-white text-xl tracking-wider border-l-2 border-white/30 pl-4">
            Collections
          </Heading>
          <ul className="space-y-4">
            {[
              "Premium Apparel",
              "Luxury Accessories",
              "Designer Footwear",
              "Evening Wear",
              "Casual Elegance",
              "Business Attire",
              "Seasonal Collections",
              "Limited Editions"
            ].map((item, index) => (
              <li key={index} className="group">
                <span className="text-sm text-gray-400 hover:text-white cursor-pointer duration-300 flex items-center gap-3 group-hover:translate-x-2 transform transition-all font-light tracking-wide">
                  <div className="w-1 h-1 bg-white/0 group-hover:bg-white rounded-full transition-all duration-300" />
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Client Services */}
        <div>
          <Heading className="font-light mb-8 text-white text-xl tracking-wider border-l-2 border-white/30 pl-4">
            Services
          </Heading>
          <ul className="space-y-4">
            {[
              "Personal Styling",
              "Size Consultation",
              "Alterations",
              "VIP Fitting",
              "Style Guides",
              "Lookbook Access",
              "Priority Access",
              "Client Events"
            ].map((item, index) => (
              <li key={index} className="group">
                <span className="text-sm text-gray-400 hover:text-white cursor-pointer duration-300 flex items-center gap-3 group-hover:translate-x-2 transform transition-all font-light tracking-wide">
                  <div className="w-1 h-1 bg-white/0 group-hover:bg-white rounded-full transition-all duration-300" />
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter & Authentication */}
        <div>
          <Heading className="font-light mb-8 text-white text-xl tracking-wider border-l-2 border-white/30 pl-4">
            Join Our World
          </Heading>
          <Paragraph className="text-sm mb-8 text-gray-400 font-light tracking-wide">
            Receive exclusive previews, styling tips, and invitations to private events. 
            Be the first to experience our latest collections.
          </Paragraph>
          
          <div className="flex flex-col gap-4">
            <InputField
              name="email"
              type="email"
              placeholder="Enter your email"
              icon={<MdEmail className="h-5 w-5 text-white/70" />}
              className="border border-white/20 rounded-lg pl-12 pr-4 py-4 w-full focus:outline-none focus:border-white/40 bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 transition-all duration-300"
            />
            <Button className="bg-white text-black hover:bg-gray-100 hover:cursor-pointer py-4 rounded-lg text-sm font-light tracking-wider transition-all duration-500 transform hover:scale-105 border border-white/20 backdrop-blur-sm">
              Subscribe to Updates
            </Button>
          </div>

          {/* Luxury Authentication */}
          <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
            <Heading className="font-light mb-4 text-white text-sm tracking-wider">EXCLUSIVE ACCESS</Heading>
            <div className="flex flex-wrap gap-3">
              {["VIP Client", "Private Fittings", "Early Access", "Personal Shopper"].map((auth, index) => (
                <span 
                  key={index}
                  className="bg-white/10 px-4 py-2 rounded-full text-xs font-light text-white border border-white/20 backdrop-blur-sm tracking-wide"
                >
                  {auth}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <Paragraph className="text-sm text-gray-400 mb-4 md:mb-0 text-center md:text-left font-light tracking-wide">
            © 2024 ELEVATE. Crafting timeless elegance for the modern individual. ✦
          </Paragraph>
          <div className="flex flex-wrap justify-center gap-6">
            {["Privacy Policy", "Terms of Service", "Client Care", "Sustainability"].map((item, index) => (
              <span 
                key={index}
                className="text-xs text-gray-400 hover:text-white cursor-pointer transition-colors duration-300 font-light tracking-wide"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Luxury decorative elements */}
      <div className="absolute bottom-8 right-8 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <GiDiamondRing className="text-2xl text-white" />
        </div>
      </div>

      {/* Top decorative elements */}
      <div className="absolute top-8 left-8 hidden lg:block">
        <div className="w-2 h-2 bg-white/30 rounded-full"></div>
      </div>

      {/* Center decorative line */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </footer>
  );
}

