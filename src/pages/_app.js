import '@/styles/output.css';
import AuthContextProvider from '@/context/auth';

export default function App({ Component, pageProps }) {
  return <AuthContextProvider>
    <Component {...pageProps} />
  </AuthContextProvider>
}
