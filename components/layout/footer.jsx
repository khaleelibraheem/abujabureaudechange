import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const footerLinks = {
  services: [
    { name: "Currency Exchange", href: "/services#exchange" },
    { name: "Live Rates", href: "/services#rates" },
    { name: "Business Exchange", href: "/services#business" },
    { name: "Multi-Currency Account", href: "/services#account" },
  ],
  // support: [
  //   { name: "Exchange Rates", href: "/support#rates" },
  //   { name: "Currency Calculator", href: "/support#calculator" },
  //   { name: "Transfer Tracking", href: "/support#tracking" },
  //   { name: "24/7 Support", href: "/support#help" },
  // ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Licenses", href: "/licenses" },
    { name: "Compliance", href: "/compliance" },
    { name: "Careers", href: "/careers" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Exchange Policy", href: "/exchange-policy" },
    { name: "Compliance", href: "/compliance" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container px-4 mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 py-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                AbujaBureauDeChange
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
              Your trusted partner for premium currency exchange services.
              Exchange between USD, GBP, EUR, NGN, and INR with competitive
              rates and instant processing.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-4 uppercase text-sm">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © {new Date().getFullYear()} AbujaBureauDeChange. All rights
              reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
