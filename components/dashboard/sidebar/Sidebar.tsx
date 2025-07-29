import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { BarChart3, User, LogOut } from 'lucide-react';
import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  const handleLogout = async () => {
    await logout();
    router.push('/auth');
  };

  if (!user) return null;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.userBrief}>
        <img src={user.picture.medium} alt={user.name.first} className={styles.userAvatar} />
        <div className={styles.userName}>{user.name.first} {user.name.last}</div>
      </div>
      <nav className={styles.nav}>
        <Link 
          href="/dashboard/overview" 
          className={`${styles.navButton} ${pathname === '/dashboard/overview' ? styles.active : ''}`}
        >
          <BarChart3 size={20} />
          <span>{t('common.overview')}</span>
        </Link>
        <Link 
          href="/dashboard/profile" 
          className={`${styles.navButton} ${pathname === '/dashboard/profile' ? styles.active : ''}`}
        >
          <User size={20} />
          <span>{t('common.profile')}</span>
        </Link>
      </nav>
      <button className={styles.logout} onClick={handleLogout}>
        <LogOut size={20} />
        <span>{t('common.logout')}</span>
      </button>
    </aside>
  );
};

export default Sidebar; 