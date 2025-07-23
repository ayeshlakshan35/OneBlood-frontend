import React from 'react';
import Navbar from '../Component/Navbar/Navbar';
import Footer from '../Component/Footer/Footer';
import about from "../assets/about.jpg";
import ws from "../assets/ws.jpg";
import { Link } from "react-router-dom";





const AboutUs = () => {
  return (

    <div className="bg-white text-gray-800">

     
      
      <section className="relative text-center mb-12 min-h-[400px] bg-red-400 py-12 rounded overflow-hidden">
       <div
        className="absolute inset-0 bg-cover bg-center opacity-30 z-0">
        <img src={about} className='w-full'/>
      </div>
      <div className="absolute inset-0 bg-black opacity-40"></div>
  
    <div className="relative z-10 text-white px-4">
    <h1 className="text-4xl md:text-5xl font-bold">About OneBlood</h1>
    <p className="mt-4 max-w-xl mx-auto text-lg">
      Connecting donors with those in need. Building a healthier community through safe and efficient blood donation services since 2010.
    </p>
    <div className="mt-8 flex flex-wrap justify-center gap-8 text-xl font-semibold">
      <div>50,000+ Lives Saved</div>
      <div>25,000+ Active Donors</div>
      <div>150+ Partner Hospitals</div>
    </div>
  </div>
</section>


      
      <section className="py-12 px-4 max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
          <p>
            To save lives by connecting blood donors with patients in need at hospitals. We are dedicated to simplifying the blood donation process and making it easily accessible.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
          <p>
            A world where blood shortage is never a barrier to saving lives. We aim to make real-time services available for all patients across the country, 24/7.
          </p>
        </div>
      </section>

      
      <section className="py-12 px-4 max-w-6xl mx-auto text-center bg-gray-100 p-6 rounded-lg shadow-sm">
        <h2 className="text-3xl font-bold mb-4">Our Story</h2>
        <p className="text-gray-700 leading-relaxed">
          Founded in 2010, OneBlood began as a small initiative by a group of medical professionals. We grew through partnerships with hospitals, local communities, and thousands of dedicated donors. Today, OneBlood is a trusted name, having helped over 100,000+ successful donations and saved countless lives.
        </p>
      </section>
      <br/>

      
      <section className="py-12 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto text-center">
          {[
            ['Safety First', 'Committed to safe blood donation and adherence to strict health standards.'],
            ['Accessibility', 'Blood donation services widely available in both urban and rural areas.'],
            ['Transparency', 'Open and honest updates on usage of donated blood.'],
            ['Innovation', 'Embracing new technologies to ensure faster, safer processes.'],
          ].map(([title, desc], i) => (
            <div key={i} className="bg-gray-100 p-6 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>


      <section className="py-12 px-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
    {[
      ['https://www.shutterstock.com/image-photo/smiling-busy-professional-latin-business-600nw-2392837495.jpg', 'Dr. Sarah Rodriguez', 'Chief Medical Officer'],
      ['https://media.istockphoto.com/id/1244524447/photo/successful-casual-business-woman-smiling.jpg?s=612x612&w=0&k=20&c=0kUhZlg5vTR-hDCOE5BlN-w2qFuQyEiaTIC8cz5i4qk=', 'Sanduni Pathirage', 'Operations Director'],
      ['https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM=', 'Lisa Chen', 'Technology Lead'],
      ['https://img.freepik.com/premium-photo/photo-portrait-young-happy-business-woman-office-girl-secretary-with-smiling-face_763111-100050.jpg?w=360', 'David Patel', 'Community Outreach'],
    ].map(([imageUrl, name, role], i) => (
      <div key={i} className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-sm">
        <img
          src={imageUrl}
          alt={name}
          className="w-16 h-16 rounded-full object-cover mb-2"
        />
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    ))}
  </div>
</section>


      
      <section className="py-12 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
          {[
            ['50,000+', 'Lives Saved'],
            ['25,000+', 'Active Donors'],
            ['150+', 'Partner Hospitals'],
            ['500+', 'Blood Camps'],
          ].map(([stat, label], i) => (
            <div key={i} className="bg-white p-6 shadow-md rounded-lg">
              <h3 className="text-2xl font-bold text-red-600">{stat}</h3>
              <p className="text-sm text-gray-600">{label}</p>
            </div>
          ))}
        </div>
      </section>
      <br/>

      
      <section
  className="relative bg-red-500 max-w-5xl mx-auto text-white py-12 text-center px-4 rounded-lg shadow-md overflow-hidden"
>
  
  <div
    className="absolute inset-0 bg-cover bg-center opacity-50 z-0"
    style={{ backgroundImage: "url('/child.png')" }}
  ></div>

 
  <div className="relative z-10">
    <h2 className="text-2xl md:text-3xl font-bold">Ready to Make a Difference?</h2>
    <p className="mt-2">
      Join thousands of donors who are already saving lives. Your contribution can make a real difference in someone’s life today.
    </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link to="/DBlood">
          <button className="bg-white text-red-600 font-semibold py-2 px-4 rounded-md hover:bg-gray-100">
          Donate Blood
          </button>
          </Link>

          <Link to="/FBlood">
          <button className="bg-white text-red-600 font-semibold py-2 px-4 rounded-md hover:bg-gray-100">
          Find Blood
          </button>
          </Link>
        </div>

  </div>
</section>


      <section className="p-6 max-w-4x5 max-h-6 mx-auto"></section>

      <Footer/>
    </div>
  );
};

export default AboutUs;
