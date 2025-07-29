'use client';
import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, Calendar, Globe, TrendingUp, DollarSign, User } from 'lucide-react';
import styles from './Profile.module.scss';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const t = useTranslations();

  if (!user) return null;

  return (
    <section className={styles.profileSection}>
      <div className={styles.profileContent}>
        {/* User Header */}
        <div className={styles.userHeader}>
          <Image src={user.picture.large} alt={user.name.first} width={128} height={128} className={styles.userAvatar} />
          <div className={styles.userInfo}>
            <h3 className={styles.userName}>{user.name.title} {user.name.first} {user.name.last}</h3>
            <div className={styles.userEmail}>
              <Mail size={16} />
              <span>{user.email}</span>
            </div>
            <div className={styles.userPhone}>
              <Phone size={16} />
              <span>{user.phone}</span>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className={styles.infoSection}>
          <h4 className={styles.sectionTitle}>
            <User size={18} />
            {t('dashboard.personalInformation')}
          </h4>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <Calendar size={16} />
              <div>
                <span className={styles.label}>{t('profile.age')}</span>
                <span className={styles.value}>{user.dob.age} {t('profile.yearsOld')}</span>
              </div>
            </div>
            <div className={styles.infoItem}>
              <Calendar size={16} />
              <div>
                <span className={styles.label}>{t('profile.birthDate')}</span>
                <span className={styles.value}>{new Date(user.dob.date).toLocaleDateString()}</span>
              </div>
            </div>
            <div className={styles.infoItem}>
              <Globe size={16} />
              <div>
                <span className={styles.label}>{t('profile.nationality')}</span>
                <span className={styles.value}>{user.nat}</span>
              </div>
            </div>
            <div className={styles.infoItem}>
              <Calendar size={16} />
              <div>
                <span className={styles.label}>{t('profile.memberSince')}</span>
                <span className={styles.value}>{new Date(user.registered.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className={styles.infoSection}>
          <h4 className={styles.sectionTitle}>
            <MapPin size={18} />
            {t('dashboard.location')}
          </h4>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <MapPin size={16} />
              <div>
                <span className={styles.label}>{t('profile.city')}</span>
                <span className={styles.value}>{user.location.city}</span>
              </div>
            </div>
            <div className={styles.infoItem}>
              <MapPin size={16} />
              <div>
                <span className={styles.label}>{t('profile.state')}</span>
                <span className={styles.value}>{user.location.state}</span>
              </div>
            </div>
            <div className={styles.infoItem}>
              <MapPin size={16} />
              <div>
                <span className={styles.label}>{t('profile.country')}</span>
                <span className={styles.value}>{user.location.country}</span>
              </div>
            </div>
            <div className={styles.infoItem}>
              <MapPin size={16} />
              <div>
                <span className={styles.label}>{t('profile.postcode')}</span>
                <span className={styles.value}>{user.location.postcode}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Crypto Portfolio */}
        <div className={styles.infoSection}>
          <h4 className={styles.sectionTitle}>
            <TrendingUp size={18} />
            {t('dashboard.cryptoPortfolio')}
          </h4>
          <div className={styles.portfolioGrid}>
            <div className={styles.portfolioCard}>
              <div className={styles.cryptoInfo}>
                <div className={styles.cryptoIcon}>₿</div>
                <div>
                  <span className={styles.cryptoName}>{t('crypto.bitcoin')}</span>
                  <span className={styles.cryptoAmount}>0.52 BTC</span>
                </div>
              </div>
              <div className={styles.cryptoValue}>$34,120.64</div>
            </div>
            <div className={styles.portfolioCard}>
              <div className={styles.cryptoInfo}>
                <div className={styles.cryptoIcon}>Ξ</div>
                <div>
                  <span className={styles.cryptoName}>{t('crypto.ethereum')}</span>
                  <span className={styles.cryptoAmount}>12.4 ETH</span>
                </div>
              </div>
              <div className={styles.cryptoValue}>$38,688.00</div>
            </div>
            <div className={styles.portfolioCard}>
              <div className={styles.cryptoInfo}>
                <div className={styles.cryptoIcon}>◎</div>
                <div>
                  <span className={styles.cryptoName}>{t('crypto.solana')}</span>
                  <span className={styles.cryptoAmount}>100.2 SOL</span>
                </div>
              </div>
              <div className={styles.cryptoValue}>$14,528.80</div>
            </div>
          </div>
          <div className={styles.portfolioTotal}>
            <DollarSign size={20} />
            <span>{t('dashboard.totalPortfolioValue')}: $87,337.44</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage; 