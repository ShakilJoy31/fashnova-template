import { Truck, Clock, MapPin } from "lucide-react";


export const deliveryOptions = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free delivery for orders above $50",
      time: "2-5 business days",
    },
    {
      icon: Clock,
      title: "Express Delivery",
      description: "Additional $10 fee",
      time: "1-2 business days",
    },
    {
      icon: MapPin,
      title: "Store Pickup",
      description: "Pick up from nearest store",
      time: "Ready in 2 hours",
    },
  ];