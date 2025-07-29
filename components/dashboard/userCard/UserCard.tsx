import React from 'react';
import Image from 'next/image';
import { User } from '@/types/user';
import styles from './UserCard.module.scss';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Image src={user.picture.large} alt={user.name.first} width={128} height={128} className={styles.avatar} />
        <div>
          <h2 className={styles.name}>{user.name.title} {user.name.first} {user.name.last}</h2>
          <div className={styles.email}>{user.email}</div>
        </div>
      </div>
      <div className={styles.infoRow}>
        <span className={styles.label}>Location:</span>
        <span>{user.location.city}, {user.location.state}, {user.location.country}</span>
      </div>
      <div className={styles.infoRow}>
        <span className={styles.label}>Phone:</span>
        <span>{user.phone}</span>
      </div>
      <div className={styles.infoRow}>
        <span className={styles.label}>Cell:</span>
        <span>{user.cell}</span>
      </div>
      <div className={styles.infoRow}>
        <span className={styles.label}>Age:</span>
        <span>{user.dob.age}</span>
      </div>
      <div className={styles.infoRow}>
        <span className={styles.label}>Nationality:</span>
        <span>{user.nat}</span>
      </div>
    </div>
  );
};

export default UserCard; 