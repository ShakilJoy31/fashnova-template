import { FaLeaf, FaInstagram, FaFacebookF, FaTwitter, FaPinterestP } from "react-icons/fa";
import { MdLocationOn, MdEmail, MdLocalShipping } from "react-icons/md";
import { IoIosLeaf } from "react-icons/io";
import { GiFruitBowl } from "react-icons/gi";
import Paragraph from "../reusable-components/Paragraph";
import Heading from "../reusable-components/Heading";
import Link from "next/link";
import Button from "../reusable-components/Button";
import InputField from "../ui/input";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-emerald-50 to-emerald-900 text-gray-800 relative overflow-hidden">
      {/* Organic Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10">
          <IoIosLeaf className="text-6xl text-emerald-600" />
        </div>
        <div className="absolute top-20 right-20">
          <GiFruitBowl className="text-5xl text-emerald-500" />
        </div>
        <div className="absolute bottom-20 left-1/4">
          <FaLeaf className="text-4xl text-emerald-400" />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-16 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        
        {/* Company Info */}
        <div className="lg:col-span-1">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-600 p-2 rounded-full">
                <FaLeaf className="text-white text-2xl" />
              </div>
              <Heading className="font-bold text-2xl text-emerald-800">Gramer Hat</Heading>
            </div>
            <Paragraph className="text-sm mb-6 text-gray-600 leading-relaxed">
              Nourishing lives with 100% organic, farm-fresh produce delivered straight to your doorstep. 
              We believe in sustainable farming and healthy living for all.
            </Paragraph>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MdLocationOn className="text-emerald-600 text-xl mt-0.5 flex-shrink-0" />
              <Paragraph className="text-sm text-gray-700">
                123 Green Valley Road,<br />
                Organic Farming District,<br />
                Fresh City, 10001
              </Paragraph>
            </div>

            <div className="flex items-center gap-3">
              <MdEmail className="text-emerald-600 text-xl flex-shrink-0" />
              <Paragraph className="text-sm text-gray-700">hello@organicharvest.com</Paragraph>
            </div>

            <div className="flex items-center gap-3">
              <MdLocalShipping className="text-emerald-600 text-xl flex-shrink-0" />
              <Paragraph className="text-sm text-gray-700">Free delivery on orders over $50</Paragraph>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 mt-6">
            {[
              { icon: <FaInstagram />, color: "bg-pink-500 hover:bg-pink-600" },
              { icon: <FaFacebookF />, color: "bg-blue-600 hover:bg-blue-700" },
              { icon: <FaTwitter />, color: "bg-sky-500 hover:bg-sky-600" },
              { icon: <FaPinterestP />, color: "bg-red-600 hover:bg-red-700" }
            ].map((social, index) => (
              <Link 
                key={index} 
                href="#" 
                className={`${social.color} duration-300 text-white p-3 rounded-full text-sm transform hover:scale-110 transition-all shadow-lg`}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Organic Categories */}
        <div>
          <Heading className="font-bold mb-6 text-emerald-800 text-lg border-l-4 border-emerald-500 pl-3">
            Fresh Categories
          </Heading>
          <ul className="space-y-3">
            {[
              "Fresh Vegetables",
              "Organic Fruits",
              "Dairy & Eggs",
              "Grains & Pulses",
              "Herbs & Spices",
              "Plant-Based Foods",
              "Cold-Pressed Oils",
              "Raw Honey & Syrups"
            ].map((item, index) => (
              <li key={index} className="group">
                <span className="text-sm text-gray-700 hover:text-white cursor-pointer duration-200 flex items-center gap-2 group-hover:translate-x-1 transform transition-transform">
                  <FaLeaf className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <Heading className="font-bold mb-6 text-emerald-800 text-lg border-l-4 border-emerald-500 pl-3">
            Support
          </Heading>
          <ul className="space-y-3">
            {[
              "Contact Farmer",
              "Delivery Info",
              "Returns & Refunds",
              "Quality Promise",
              "Recipe Guides",
              "Subscription Plans",
              "Farm Visits",
              "Sustainability"
            ].map((item, index) => (
              <li key={index} className="group">
                <span className="text-sm text-gray-700 hover:text-white cursor-pointer duration-200 flex items-center gap-2 group-hover:translate-x-1 transform transition-transform">
                  <FaLeaf className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <Heading className="font-bold mb-6 text-emerald-800 text-lg border-l-4 border-emerald-500 pl-3">
            Join Our Community
          </Heading>
          <Paragraph className="text-sm mb-6 text-gray-600">
            Get weekly recipes, farming updates, and exclusive offers delivered fresh to your inbox.
          </Paragraph>
          
          <div className="flex flex-col gap-4">
            <InputField
              name="email"
              type="email"
              placeholder="Your email address"
              icon={<MdEmail className="h-5 w-5 text-emerald-600" />}
              className="border-2 border-emerald-200 rounded-lg pl-12 pr-4 py-3 w-full focus:outline-none focus:border-emerald-500 bg-white shadow-sm transition-colors"
            />
            <Button className="bg-gradient-to-r hover:cursor-pointer from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white py-3 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Subscribe to Newsletter
            </Button>
          </div>

          {/* Organic Certifications */}
          <div className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <Heading className="font-bold mb-3 text-emerald-800 text-sm">Certified Organic</Heading>
            <div className="flex flex-wrap gap-2">
              {["USDA Organic", "EU Organic", "Non-GMO", "Soil Association"].map((cert, index) => (
                <span 
                  key={index}
                  className="bg-white px-3 py-1 rounded-full text-xs font-medium text-emerald-700 border border-emerald-300 shadow-sm"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-emerald-200 my-4 pt-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <Paragraph className="text-sm text-white mb-4 md:mb-0 text-center md:text-left">
            © 2024 OrganicHarvest. Cultivating health, nurturing nature. 🌱
          </Paragraph>
          <div className="flex flex-wrap justify-center gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Sustainability Pledge"].map((item, index) => (
              <span 
                key={index}
                className="text-xs text-white hover:text-emerald-700 cursor-pointer transition-colors duration-200 font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute bottom-10 right-10 hidden lg:block">
        <div className="bg-emerald-100 rounded-full p-3 animate-bounce">
          <GiFruitBowl className="text-3xl text-emerald-600" />
        </div>
      </div>
    </footer>
  );
}