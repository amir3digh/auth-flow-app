import React from 'react';
import { useTranslations } from 'next-intl';
import styles from './Overview.module.scss';

const CryptoCard: React.FC<{ name: string; symbol: string; price: number; change: number }> = ({ name, symbol, price, change }) => (
  <div className={styles.cryptoCard}>
    <span style={{ fontWeight: 700, fontSize: 18 }}>{name} <span className={styles.symbol}>{symbol}</span></span>
    <span className={styles.price}>${price.toLocaleString()}</span>
    <span className={styles.change} style={{ color: change >= 0 ? '#22c55e' : '#ef4444' }}>{change >= 0 ? '+' : ''}{change}%</span>
  </div>
);

const OverviewPage: React.FC = () => {
  const t = useTranslations();
  
  return (
    <section className={styles.overviewSection}>
      <h2>{t('dashboard.marketOverview')}</h2>
      <div className={styles.cryptoCards}>
        <CryptoCard name={t('crypto.bitcoin')} symbol="BTC" price={67320.12} change={+2.3} />
        <CryptoCard name={t('crypto.ethereum')} symbol="ETH" price={3120.45} change={-1.1} />
        <CryptoCard name={t('crypto.solana')} symbol="SOL" price={145.67} change={+4.8} />
      </div>
    </section>
  );
};

export default OverviewPage; 