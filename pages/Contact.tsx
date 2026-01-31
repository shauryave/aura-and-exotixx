
import React from 'react';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { SiteConfig } from '../types';

export default function Contact({ config }: { config: SiteConfig }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <div>
          <h1 className="text-5xl font-serif mb-8">Get in Touch</h1>
          <p className="text-stone-500 font-light text-lg leading-relaxed mb-12">
            Have a question about our collections or need assistance with sizing? 
            Our concierge team is here to provide you with a personalized experience.
          </p>

          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-stone-100 flex items-center justify-center text-stone-900 rounded-full shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg mb-1">Phone</h3>
                <p className="text-stone-500">{config.contactPhone}</p>
                <p className="text-stone-400 text-sm mt-1">Available Mon-Fri, 10am - 6pm</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-stone-100 flex items-center justify-center text-stone-900 rounded-full shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg mb-1">Email</h3>
                <p className="text-stone-500">{config.contactEmail}</p>
                <p className="text-stone-400 text-sm mt-1">We typically reply within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-stone-100 flex items-center justify-center text-stone-900 rounded-full shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg mb-1">Showroom</h3>
                <p className="text-stone-500">Available by Appointment Only</p>
                <p className="text-stone-400 text-sm mt-1">Paris • Milan • Dubai</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-stone-50 p-10 lg:p-16 border border-stone-100">
          <div className="mb-10 flex items-center space-x-4">
            <MessageSquare size={24} className="text-stone-900" />
            <h2 className="text-2xl font-serif">Inquiry Form</h2>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-stone-400 font-bold">First Name</label>
                <input type="text" className="w-full bg-white border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-900" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-stone-400 font-bold">Last Name</label>
                <input type="text" className="w-full bg-white border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-900" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-stone-400 font-bold">Email Address</label>
              <input type="email" className="w-full bg-white border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-900" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-stone-400 font-bold">Message</label>
              <textarea rows={4} className="w-full bg-white border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-900" />
            </div>
            <button className="w-full bg-stone-900 text-white py-4 text-xs tracking-[0.3em] uppercase font-bold hover:bg-stone-800 transition-colors">
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
