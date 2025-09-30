import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

type LinkItem = {
  label: string;
  href: string;
};

export default function Footer() {
  const quickLinks: LinkItem[] = [
    { label: "About", href: "#" },
    { label: "Seller Guide", href: "#" },
    { label: "Rules", href: "#" },
    { label: "FAQs", href: "#" },
    { label: "Contact", href: "#" },
  ];

  const services: LinkItem[] = [
    { label: "Join our Facebook Group", href: "#" },
    { label: "Discussion Forums", href: "#" },
    { label: "Learning Center", href: "#" },
    { label: "Success Stories", href: "#" },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">DTF</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">DTF</h3>
                <p className="text-xs text-pink-600 font-semibold">SUPERMARKET</p>
              </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              The premier destination for buying and selling DTF transfers,
              vinyl, fabric, and craft supplies through live events and
              verified sellers.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-lg bg-pink-600 hover:bg-pink-700 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <FooterSection title="Quick Links" items={quickLinks} />

          {/* Services */}
          <FooterSection title="Services" items={services} />

          {/* Contact */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@dtfsuperstash.com"
                  className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm group"
                >
                  <MdEmail className="w-4 h-4 text-gray-400 group-hover:text-pink-600" />
                  <span>info@dtfsuperstash.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:267-471-5060"
                  className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm group"
                >
                  <MdPhone className="w-4 h-4 text-gray-400 group-hover:text-pink-600" />
                  <span>267-471-5060</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <MdLocationOn className="w-4 h-4 text-gray-400" />
                <span>Flourtown, PA</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">© 2025 ABC. All rights reserved.</p>
            <div className="flex flex-wrap gap-6 justify-center">
              {["Privacy & Policy", "Terms of Services", "Help & Support"].map(
                (text) => (
                  <a
                    key={text}
                    href="#"
                    className="text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm"
                  >
                    {text}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* Reusable Section Component */
function FooterSection({ title, items }: { title: string; items: LinkItem[] }) {
  return (
    <div>
      <h3 className="font-bold text-gray-900 text-lg mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
