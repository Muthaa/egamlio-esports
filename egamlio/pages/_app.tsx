import type { AppProps } from 'next/app'
import React from 'react';
import { AuthProvider } from '@/components/AuthContext'
import 'bootstrap/dist/css/bootstrap.css';
import "./../styles/style.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}