'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { BarChart3, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslations } from 'next-intl';
import ThemeToggle from '@/components/themeToggler/ThemeToggle';
import LanguageSwitcher from '@/components/languageSwitcher/LanguageSwitcher';
import Sidebar from '@/components/dashboard/sidebar/Sidebar';
import AuthRedirect from '@/components/AuthRedirect';
import styles from './DashboardLayout.module.scss';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  const handleLogout = async () => {
    await logout();
    router.push('/auth');
  };

  return (
    <>
      <AuthRedirect requireAuth={true} />
      {loading ? (
        <div className={styles.dashboardLayout}>
          <div className={styles.content} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div>{t('common.loading')}</div>
          </div>
        </div>
      ) : user ? (
        <div className={styles.dashboardLayout}>
          {/* Desktop Sidebar */}
          <div className={styles.desktopSidebar}>
            <Sidebar />
          </div>

          <main className={styles.main}>
            <header className={styles.header}>
              <div className={styles.headerLeft}>
                <Link href="/" className={styles.appName}>{t('dashboard.appName')}</Link>
                {/* Mobile User Info */}
                <div className={styles.mobileUserInfo}>
                  <img src={user.picture.thumbnail} alt={user.name.first} className={styles.mobileAvatar} />
                  <span className={styles.mobileUserName}>{user.name.first}</span>
                </div>
              </div>

              <div className={styles.headerActions}>
                {/* Mobile Navigation */}
                <div className={styles.mobileNav}>
                  <Link
                    href="/dashboard/overview"
                    className={`${styles.mobileNavButton} ${pathname === '/dashboard/overview' ? styles.active : ''}`}
                  >
                    <BarChart3 size={18} />
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className={`${styles.mobileNavButton} ${pathname === '/dashboard/profile' ? styles.active : ''}`}
                  >
                    <User size={18} />
                  </Link>
                </div>
                <LanguageSwitcher />
                <ThemeToggle />
                <button className={styles.mobileLogout} onClick={handleLogout}>
                  <LogOut size={18} />
                </button>
              </div>
            </header>
            <div className={styles.content}>
              {children}
            </div>
          </main>
        </div>
      ) : null}
    </>
  );
} 