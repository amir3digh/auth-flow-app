'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import styles from './LanguageSwitcher.module.scss';

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Extract locale from pathname
  const pathLocale = pathname.match(/^\/(en|fa)/)?.[1] || 'en';
  
  // Debug logging
  console.log('Pathname:', pathname);
  console.log('Detected locale:', pathLocale);

  const switchLanguage = (newLocale: string) => {
    // Remove all locale prefixes from the pathname
    const pathWithoutLocale = pathname.replace(/^\/(en|fa)/, '');
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    console.log('Switching to:', newPath);
    router.push(newPath);
  };

  return (
    <div className={styles.languageSwitcher}>
      <Globe size={16} />
      <button
        className={`${styles.langButton} ${pathLocale === 'en' ? styles.active : ''}`}
        onClick={() => switchLanguage('en')}
      >
        EN
      </button>
      <button
        className={`${styles.langButton} ${pathLocale === 'fa' ? styles.active : ''}`}
        onClick={() => switchLanguage('fa')}
      >
        فارسی
      </button>
    </div>
  );
};

export default LanguageSwitcher; 