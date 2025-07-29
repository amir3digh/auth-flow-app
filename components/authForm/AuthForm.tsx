"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import { useAuth } from "@/contexts/AuthContext";
import { loginSchema, LoginFormData } from "@/lib/schemas";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import styles from "./AuthForm.module.scss";

const AuthForm: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setError(null);

    const result = await login(data.phone);
    
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Login failed');
    }
    
    setIsSubmitting(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>{t('auth.title')}</h1>
      
      {error && (
        <div style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center' }}>
          {error}
        </div>
      )}
      
      <Input
        label={t('auth.phoneLabel')}
        type="tel"
        placeholder={t('auth.phonePlaceholder')}
        {...register("phone")}
        error={errors.phone?.message === 'phone_validation_error' ? t('auth.phoneError') : errors.phone?.message}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? t('auth.loggingIn') : t('auth.loginButton')}
      </Button>
    </form>
  );
};

export default AuthForm; 