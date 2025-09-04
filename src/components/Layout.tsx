import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";

export function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  
  // Hide sidebar and topnav on login page
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Outlet />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex h-screen bg-background">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onCollapse={setSidebarCollapsed}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <TopNav />
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}