import React from "react";
import styles from "@/components/authForm/AuthForm.module.scss";
import AuthForm from "@/components/authForm/AuthForm";
import ThemeToggle from "@/components/themeToggler/ThemeToggle";
import LanguageSwitcher from "@/components/languageSwitcher/LanguageSwitcher";
import AuthRedirect from "@/components/AuthRedirect";
import Link from "next/link";

const AuthPage = () => {
    return (
        <>
            <AuthRedirect requireAuth={false} />
            <div className={styles.appName}>
                <Link href="/">Auth Flow App</Link>
            </div>
            <div className={styles.authWrapper}>
                <div className={styles.themeToggle}>
                    <LanguageSwitcher />
                    <ThemeToggle />
                </div>
                <AuthForm />
            </div>
        </>
    );
};

export default AuthPage;
