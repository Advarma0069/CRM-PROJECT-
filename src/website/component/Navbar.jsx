import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="text-2xl font-bold text-blue-700">
            TechNova
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8 text-gray-700 font-medium">

            <div className="relative">
              <button
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
                className="flex items-center gap-1 hover:text-blue-600"
              >
                Solutions <ChevronDown size={16} />
              </button>

              {megaOpen && (
                <div
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                  className="absolute top-10 left-0 bg-white shadow-xl rounded-xl p-6 w-[600px] grid grid-cols-2 gap-6"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">CRM Solutions</h4>
                    <p className="text-sm text-gray-500">Sales Automation</p>
                    <p className="text-sm text-gray-500">Marketing Automation</p>
                    <p className="text-sm text-gray-500">Customer Support</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Enterprise</h4>
                    <p className="text-sm text-gray-500">ERP Systems</p>
                    <p className="text-sm text-gray-500">HR Management</p>
                    <p className="text-sm text-gray-500">Analytics Dashboard</p>
                  </div>
                </div>
              )}
            </div>

            <a href="#" className="hover:text-blue-600">Products</a>
            <a href="#" className="hover:text-blue-600">Industries</a>
            <a href="#" className="hover:text-blue-600">Resources</a>
            <a href="#" className="hover:text-blue-600">Pricing</a>
            <a href="#" className="hover:text-blue-600">About</a>
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Login
            </a>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
              Get Demo
            </button>
          </div>

          {/* Mobile Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md px-6 py-4 space-y-3">
          <a href="#" className="block">Solutions</a>
          <a href="#" className="block">Products</a>
          <a href="#" className="block">Industries</a>
          <a href="#" className="block">Resources</a>
          <a href="#" className="block">Pricing</a>
          <a href="#" className="block">About</a>
          <a href="#" className="block text-blue-600 font-semibold">Login</a>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
            Get Demo
          </button>
        </div>
      )}
    </nav>
  );
}