
import './global.css';

import { auth, signIn, signOut } from '@/auth';

export const metadata = {
  title: 'FinKit — Component Library',
  description:
    'A finance-flavored UI design system built with React and TypeScript.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <a href="/" className="nav__brand">
            FinKit
          </a>
          <ul className="nav__links">
            <li>
              <a href="/" className="nav__link">
                Components
              </a>
            </li>
            <li>
              <a href="/protected" className="nav__link">
                Dashboard
              </a>
            </li>
          </ul>
          <div className="nav__spacer" />
          {session ? (
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button type="submit" className="nav__auth-btn">
                Sign out
              </button>
            </form>
          ) : (
            <form
              action={async () => {
                'use server';
                await signIn('github');
              }}
            >
              <button type="submit" className="nav__auth-btn">
                Sign in with GitHub
              </button>
            </form>
          )}
        </nav>
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
