import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/api/auth/signin');
  }

  return (
    <section>
      <h1 className="section__title" style={{ marginBottom: 24 }}>
        Dashboard
      </h1>
      <div className="protected-card">
        {session.user.image && (
          <img
            src={session.user.image}
            alt=""
            className="protected-card__avatar"
          />
        )}
        <p className="protected-card__name">{session.user.name}</p>
        <p className="protected-card__email">{session.user.email}</p>
        <p
          style={{
            marginTop: 16,
            fontSize: '0.875rem',
            color: 'var(--fk-text-muted)',
          }}
        >
          You are authenticated via GitHub OAuth.
          This page is protected by Auth.js middleware.
        </p>
      </div>
    </section>
  );
}
