import React, { useEffect } from "react";

const Header = () => {
  return (
    <header className="bg-gray-800 p-4">
      <div className="flex justify-between">
        <div className="w-1/12"></div>
      <div className="container mx-auto">
        <h1 className="text-white text-2xl font-bold">Thu thập dữ liệu bệnh nhân tiểu đường</h1>
      </div>
      <div className="text-white text-lg font-bold w-1/12">
        <a href="/admin/list">Đăng nhập</a>
      </div>
      </div>
    </header>
  );
};

export default Header;
