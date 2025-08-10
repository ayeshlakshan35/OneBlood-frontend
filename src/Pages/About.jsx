import React from 'react';
import Navbar from '../Component/Navbar/Navbar';
import Footer from '../Component/Footer/Footer';
import about from "../assets/about.jpg";
import { Link } from "react-router-dom";
import { FaShieldAlt, FaMapMarkedAlt, FaEye, FaLightbulb } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[450px] flex items-center justify-center text-center">
        <img
          src={about}
          alt="About OneBlood"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        <div className="relative z-10 px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            About OneBlood
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Connecting donors with those in need since 2010. Building a healthier
            community through safe, efficient blood donation services.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {[
          { title: "Our Mission", text: "To save lives by connecting blood donors with patients in need. We simplify the donation process to make it accessible for everyone." },
          { title: "Our Vision", text: "A world where blood shortage never prevents saving lives. We aim for real-time services available for all, 24/7." }
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold mb-4 text-red-600">{item.title}</h2>
            <p className="text-gray-700 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-6">Our Story</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          Founded in 2010, OneBlood began as a small initiative by medical
          professionals. Through partnerships with hospitals and communities, we
          have enabled 100,000+ successful donations — saving countless lives.
        </p>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
          {[
            { icon: <FaShieldAlt size={30} className="text-red-500 mb-4" />, title: "Safety First", desc: "Committed to safe donations & strict health standards." },
            { icon: <FaMapMarkedAlt size={30} className="text-red-500 mb-4" />, title: "Accessibility", desc: "Available in both urban & rural areas." },
            { icon: <FaEye size={30} className="text-red-500 mb-4" />, title: "Transparency", desc: "Honest updates on the usage of donated blood." },
            { icon: <FaLightbulb size={30} className="text-red-500 mb-4" />, title: "Innovation", desc: "Using new tech for faster, safer processes." }
          ].map((value, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition hover:-translate-y-1"
            >
              {value.icon}
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-gray-600">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ['https://www.shutterstock.com/image-photo/smiling-busy-professional-latin-business-600nw-2392837495.jpg', 'Dr. Sarah Rodriguez', 'Chief Medical Officer'],
            ['https://media.istockphoto.com/id/1244524447/photo/successful-casual-business-woman-smiling.jpg?s=612x612&w=0&k=20&c=0kUhZlg5vTR-hDCOE5BlN-w2qFuQyEiaTIC8cz5i4qk=', 'Sanduni Pathirage', 'Operations Director'],
            ['https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM=', 'Lisa Chen', 'Technology Lead'],
            ['https://img.freepik.com/premium-photo/photo-portrait-young-happy-business-woman-office-girl-secretary-with-smiling-face_763111-100050.jpg?w=360', 'David Patel', 'Community Outreach'],
          ].map(([img, name, role], i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition hover:-translate-y-1"
            >
              <img
                src={img}
                alt={name}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-red-500"
              />
              <p className="font-semibold text-lg">{name}</p>
              <p className="text-sm text-gray-600">{role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative max-w-5xl mx-auto text-white py-16 text-center px-4 rounded-2xl shadow-lg overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-90"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Make a Difference?</h2>
          <p className="mt-4 max-w-2xl mx-auto">
            Join thousands of donors already saving lives. Your contribution can
            truly make a difference today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/DBlood">
              <button className="bg-white text-red-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition">
                Donate Blood
              </button>
            </Link>
            <Link to="/FBlood">
              <button className="bg-white text-red-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition">
                Find Blood
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
