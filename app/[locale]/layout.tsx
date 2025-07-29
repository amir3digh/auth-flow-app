import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {ThemeProvider} from '@/contexts/ThemeContext';
import {AuthProvider} from '@/contexts/AuthContext';
import '@/styles/theme.scss';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <div lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'}>
      <NextIntlClientProvider messages={messages}>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    </div>
  );
} 