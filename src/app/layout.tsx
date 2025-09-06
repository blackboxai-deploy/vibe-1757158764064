import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tic Tac Toe - Challenge the AI',
  description: 'Play Tic Tac Toe against an intelligent AI with multiple difficulty levels, beautiful themes, and sound effects.',
  keywords: ['tic tac toe', 'game', 'ai', 'strategy', 'puzzle'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}