import "./globals.css";
import { AuthProvider } from '@/context/AuthProvider';

export default function RootLayout({ children }) {
  return (
    <div className="app">
      <AuthProvider>
        {children}
      </AuthProvider>
    </div>
  );
}