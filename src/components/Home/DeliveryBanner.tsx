"use client";

import Image from "next/image";
import delevaryImage from "../../../public/Delivery-Illustration.jpg"
import Button from "../reusable-components/Button";

const DeliveryBanner = () => {
  return (
  <section className="px-2 mt-4">
      <div className="bg-[#800080] rounded-xl p-4 md:p-6 lg:p-8 shadow-sm container md:mx-auto">
      <div className="bg-white rounded-lg flex flex-col md:flex-row items-center justify-between p-6 md:p-10">
        {/* Left Content */}
        <div className="max-w-xl text-center md:text-left space-y-4">
          <p className="text-gray-700 font-medium">
            Organic Products and Food
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Quick Delivery to Your Home
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            There are many products you will find in our shop. Choose your daily
            necessary product from our KachaBazar shop and get some special
            offers. See our latest discounted products from here and get a
            special discount.
          </p>
          <Button className="mt-4 px-6 py-3 bg-[#800080] hover:bg-pruple-600 text-white font-semibold rounded-full transition">
            Download App
          </Button>
        </div>

        {/* Right Illustration */}
        <div className="mt-6 md:mt-0 md:ml-8 flex-shrink-0">
          <Image
            src={delevaryImage}
            alt="Delivery Illustration"
            width={400}
            height={300}
            className="w-full max-w-sm h-auto"
            priority
          />
        </div>
      </div>
    </div>
  </section>
  );
};

export default DeliveryBanner;
