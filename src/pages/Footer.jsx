// src/components/Footer.jsx
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";   // ✅ TikTok icon

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-red-900 to-black text-gray-300 py-10 mt-2">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            MK Construction
          </h2>
          <p className="text-sm leading-relaxed text-gray-200">
            Building with integrity, quality, and innovation.  
            We deliver construction solutions that stand the test of time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="/services" className="hover:text-white transition-colors">Our Services</a></li>
            <li><a href="/projects" className="hover:text-white transition-colors">Projects</a></li>
            <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="text-gray-200">📍 Nairobi, Kenya</li>
            <li className="text-gray-200">📞 +254 111 480 349</li>
            <li className="text-gray-200">📧 info@mkconstruction.com</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="https://www.facebook.com/share/1FHARkdEPc/" className="hover:text-white transition-colors"><FaFacebookF /></a>
            <a href="https://x.com/mkstudioke?t=S1uCFYYQa_nY9AxKkB3dVg&s=09" className="hover:text-white transition-colors"><FaTwitter /></a>
            <a href="https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=r9j9168" className="hover:text-white transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-white transition-colors"><FaLinkedinIn /></a>
            <a href="http://tiktok.com/@mk_constr.groupke" className="hover:text-white"><FaTiktok /></a> {/* ✅ TikTok */}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} MuterianC. All Rights Reserved.
      </div>
    </footer>
  );
}