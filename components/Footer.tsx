import Image from "next/image";
import Link from "next/link";

import { Phone, Mail, MapPin } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white mt-24">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-12">

          {/* Company */}

          <div>

            <Image
              src="/images/logo/stc-logo.png"
              alt="Strong Tower Concepts"
              width={90}
              height={90}
              className="mb-6"
            />

            <h2 className="text-4xl font-black leading-none">
              STRONG TOWER
            </h2>

            <h3 className="text-2xl font-bold tracking-[0.35em] text-yellow-400 mt-2">
              CONCEPTS
            </h3>

            <p className="mt-6 text-blue-200 leading-8">
              One Vision. Many Solutions. Endless Value.
            </p>

          </div>

          {/* Marketplace */}

          <div>

            <h3 className="text-xl font-bold mb-6">
              Marketplace
            </h3>

            <ul className="space-y-4 text-blue-200">

              <li><Link href="/marketplace/properties">Properties</Link></li>

              <li><Link href="/marketplace/vehicles">Vehicles</Link></li>

              <li><Link href="/marketplace/interior">Interior Needs</Link></li>

            </ul>

          </div>

          {/* Services */}

          <div>

            <h3 className="text-xl font-bold mb-6">
              Services
            </h3>

            <ul className="space-y-4 text-blue-200">

              <li><Link href="/business/cac">CAC Registration</Link></li>

              <li><Link href="/business/nin">NIN Services</Link></li>

              <li><Link href="/ict/web-development">Website Development</Link></li>

              <li><Link href="/cargo">Cargo & Logistics</Link></li>

            </ul>

          </div>

          {/* Partner With Us */}

          <div>

            <h3 className="text-xl font-bold mb-6 text-yellow-400">
              Partner With Us
            </h3>

            <p className="text-blue-200 leading-7 mb-5">
              Grow your business by joining Strong Tower Concepts.
              Reach thousands of customers through our marketplace.
            </p>

            <ul className="space-y-3 text-blue-200">

              <li>✔ Become a Property Agent</li>

              <li>✔ Sell Vehicles</li>

              <li>✔ Register Your Business</li>

              <li>✔ Offer ICT Services</li>

              <li>✔ Become a Logistics Partner</li>

            </ul>

            <Link
              href="/partner"
              className="inline-block mt-6 rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-blue-950 hover:bg-yellow-300 transition"
            >
              Become a Partner
            </Link>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-bold mb-6">
              Contact Us
            </h3>

            <div className="space-y-5 text-blue-200">

              <div className="flex gap-3 items-center">
                <MapPin size={18} />
                <span>Lagos, Nigeria</span>
              </div>

              <div className="flex gap-3 items-center">
                <Phone size={18} />
                <span>07015217449</span>
              </div>

              <div className="flex gap-3 items-center">
                <Mail size={18} />
                <span>info@strongtowerconcepts.com</span>
              </div>

            </div>

            <div className="flex gap-4 mt-8">

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-blue-950 transition"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-blue-950 transition"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-blue-950 transition"
              >
                <FaLinkedinIn size={18} />
              </a>

              <a
                href="https://wa.me/2347015217449"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-blue-950 transition"
              >
                <FaWhatsapp size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-blue-950 transition"
              >
                <FaXTwitter size={18} />
              </a>

            </div>

          </div>

        </div>

      </div>

      <div className="border-t border-blue-800">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-blue-300 text-sm">

          <span>
            © 2026 Strong Tower Concepts. All Rights Reserved.
          </span>

          <div className="flex gap-6 mt-4 md:mt-0">

            <Link href="/privacy">Privacy Policy</Link>

            <Link href="/terms">Terms of Service</Link>

            <Link href="/partner">Partner With Us</Link>

            <Link href="/contact">Contact</Link>

          </div>

        </div>

      </div>

    </footer>
  );
}