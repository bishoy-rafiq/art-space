import React from "react";

const SectionOrders = ({ orders = [] }) => {
  if (!orders || !Array.isArray(orders)) {
    return <p className="text-center text-gray-500">لا توجد بيانات متاحة.</p>;
  }

  return (
    <div className="mb-8">
      <h2 className="text-right text-lg font-semibold mb-4">مشترياتي</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {orders.map((item) => (
          <div key={item.order_id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-sm font-bold text-gray-800 text-right mt-2">{item.title}</h3>
              <p className="text-xs text-gray-500 text-right mt-2">{item.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default SectionOrders;
