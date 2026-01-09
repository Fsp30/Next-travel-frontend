import type { Metadata } from 'next';
import { Providers } from './providers';
import { Inter } from 'next/font/google';
import './global.css';
import { getCurrentUser } from './lib/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Travel',
  description: 'Criado por Filipe de Paula fxp)',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">✈️</span>
                  </div>
                  <span className="text-2xl font-bold">Next Travel</span>
                </div>
                <p className="text-gray-400 mt-2">
                  Planeje sua viagem perfeita
                </p>
              </div>

              <div className="flex gap-6">
                <a href="/sobre" className="text-gray-400 hover:text-white">
                  Sobre
                </a>
                <a href="/contato" className="text-gray-400 hover:text-white">
                  Contato
                </a>
                <a href="/termos" className="text-gray-400 hover:text-white">
                  Termos
                </a>
                <a
                  href="/privacidade"
                  className="text-gray-400 hover:text-white"
                >
                  Privacidade
                </a>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
              <p>© 2026 Next Travel. NikeTn.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
