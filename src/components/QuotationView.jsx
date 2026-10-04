import React from "react";
import { FaPrint, FaDownload, FaEnvelope, FaTimes } from "react-icons/fa";

const QuotationView = ({ data, onClose }) => {
  // Sample calculation logic for the quotation
  const items = [
    { desc: "Product Service A", qty: 1, rate: 5000, tax: "18%" },
    { desc: "Maintenance Fee", qty: 2, rate: 1500, tax: "18%" },
  ];

  const subTotal = items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
  const taxAmount = subTotal * 0.18;
  const total = subTotal + taxAmount;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col rounded-xl shadow-2xl">
        
        {/* Modal Header Actions */}
        <div className="p-4 border-b dark:border-slate-700 flex justify-between items-center bg-gray-50 dark:bg-slate-800">
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
              <FaPrint /> Print
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
              <FaDownload /> PDF
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">
              <FaEnvelope /> Send to {data.name}
            </button>
          </div>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-red-500 transition">
            <FaTimes size={24} />
          </button>
        </div>

        {/* The Quotation Document */}
        <div className="p-8 overflow-y-auto bg-white text-gray-900">
          <div id="quotation-content" className="border p-8 rounded shadow-sm">
            {/* Header: Company Info */}
            <div className="flex justify-between mb-8 border-b pb-6">
              <div>
                <h1 className="text-3xl font-bold text-blue-700 uppercase">Quotation</h1>
                <p className="text-sm text-gray-500">Reference: #QT-{data.id || '101'}</p>
                <p className="text-sm text-gray-500">Date: {data.date || '2023-10-24'}</p>
              </div>
              <div className="text-right">
                <h2 className="text-xl font-bold">YOUR COMPANY PVT LTD</h2>
                <p className="text-sm">123 Business Hub, MG Road</p>
                <p className="text-sm">Mumbai, Maharashtra - 400001</p>
                <p className="text-sm">GSTIN: 27AAAAA0000A1Z5</p>
              </div>
            </div>

            {/* Billing Info */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-bold text-gray-600 uppercase text-xs mb-2">Quotation For:</h3>
                <p className="font-bold text-lg">{data.name}</p>
                <p className="text-sm">{data.company}</p>
                <p className="text-sm">{data.city}, {data.state}</p>
                <p className="text-sm">Phone: {data.phone}</p>
                <p className="text-sm">Email: {data.email}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded text-right">
                <h3 className="font-bold text-gray-600 uppercase text-xs mb-2">Salesperson:</h3>
                <p className="font-medium">{data.salesperson}</p>
                <p className="text-sm italic">Lead Source: {data.source}</p>
                <p className="text-sm">Inquiry Status: <span className="text-blue-600 font-bold">{data.status}</span></p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full mb-8">
              <thead>
                <tr className="bg-blue-700 text-white">
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-center">Qty</th>
                  <th className="p-2 text-right">Unit Price</th>
                  <th className="p-2 text-right">Tax</th>
                  <th className="p-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="border">
                {items.map((item, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">{item.desc}</td>
                    <td className="p-2 text-center">{item.qty}</td>
                    <td className="p-2 text-right">₹{item.rate.toLocaleString()}</td>
                    <td className="p-2 text-right">{item.tax}</td>
                    <td className="p-2 text-right font-medium">₹{(item.qty * item.rate).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals Section */}
            <div className="flex justify-end mb-8">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>₹{subTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>GST (18%):</span>
                  <span>₹{taxAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-bold text-lg text-blue-700">
                  <span>Grand Total:</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="text-[10px] text-gray-500 border-t pt-4">
              <h4 className="font-bold uppercase mb-1">Terms & Conditions:</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>This quotation is valid for 30 days from the date of issue.</li>
                <li>Payment terms: 50% advance, 50% on completion.</li>
                <li>All disputes are subject to local jurisdiction.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationView;
