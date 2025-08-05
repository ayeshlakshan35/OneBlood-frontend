import React from "react";
import {
  Heart,
  Droplet,
  CalendarCheck,
  PhoneCall,
} from "lucide-react";

const services = [
  {
    icon: <Heart className="w-10 h-10 text-red-500" />,
    title: "Expert Donors",
    description:
      "We have passionate, experienced donors committed to saving lives through blood donation.",
  },
  {
    icon: <Droplet className="w-10 h-10 text-red-500" />,
    title: "Safe Blood Quality",
    description:
      "Ensuring all donated blood is thoroughly tested and safe for transfusion.",
  },
  {
    icon: <CalendarCheck className="w-10 h-10 text-red-500" />,
    title: "Easy Online Booking",
    description:
      "Schedule your blood donation appointment anytime, anywhere, through our website.",
  },
  {
    icon: <PhoneCall className="w-10 h-10 text-red-500" />,
    title: "24/7 Blood Request",
    description:
      "Contact us anytime to request or find the blood type you need urgently.",
  },
];

export default function Camp() {
  return (
    <div>
      <section className="bg-white py-10 px-4 md:px-20">
        
        <div className="flex flex-wrap justify-center gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="w-full sm:w-[45%] lg:w-[22%] bg-red-50 border border-red-200 rounded-2xl p-6 text-center hover:bg-red-700 hover:text-white transition duration-300 shadow-md hover:scale-105"
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
