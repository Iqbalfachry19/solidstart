import { Title } from 'solid-start';
import Counter from '~/components/Counter';
import { signIn, signOut } from '@auth/solid-start/client';
import { getSession } from '@auth/solid-start';
import { createServerData$ } from 'solid-start/server';
import { authOpts } from '~/routes/api/auth/[...solidauth]';
import { useRouteData } from 'solid-start';
import { createSignal } from 'solid-js';
export const routeData = () => {
  return createServerData$(
    async (_, { request }) => {
      return await getSession(request, authOpts);
    },
    { key: () => ['auth_user'] },
  );
};
export default function Home() {
  const login = () => signIn('github');
  const logout = () => signOut();
  const session = useRouteData<typeof routeData>();
  const loading = session.loading;
  const user = () => session()?.user;
  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <Counter />
      <p>
        Visit{' '}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{' '}
        to learn how to build SolidStart apps.
      </p>
      {session()?.user?.name}
      <button onClick={login}>login</button>
      <button onClick={logout}>logout</button>
    </main>
  );
}
