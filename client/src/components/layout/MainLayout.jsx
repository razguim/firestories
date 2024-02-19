import React from "react";
import { Outlet } from "react-router-dom";
import MainMenu from "../common/MainMenu";

export default function MainLayout() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row justify-between  gap-4">
      <header className="w-full relative z-50 h-12 md:static md:w-1/4 md:p-2">
        <MainMenu/>
      </header>
      <main className="w-full md:w-3/4 p-2">
        <Outlet />
      </main>
    </div>
  );
}
