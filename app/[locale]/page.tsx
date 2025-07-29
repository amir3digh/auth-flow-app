'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { useTranslations } from 'next-intl';
import MarkdownRenderer from '@/components/markdownRenderer/MarkdownRenderer';
import styles from '@/app/HomePage.module.scss';

// Import the project description content
const projectDescription = `# 🔐 Authentication Flow Application

A sophisticated authentication system built with Next.js, TypeScript, and SCSS Modules. This application demonstrates a complete, secure authentication flow with JWT tokens, database persistence, and modern UI/UX practices.

## 🎯 Project Overview

This application implements a **production-ready authentication system** that goes beyond basic requirements, featuring:

- **Secure JWT-based Authentication** with HTTP-only cookies
- **SQLite Database** for user and token persistence
- **Phone Number Validation** with Iranian mobile format
- **Random User API Integration** for demo user data
- **Protected Routes** with automatic redirection
- **Session Management** with secure token handling
- **Modern UI/UX** with responsive design and theme support

## 🔐 Authentication System Architecture

### **Core Authentication Flow**

#### **1. User Registration/Login Process**
\`\`\`
User Input → Validation → API Call → User Creation/Retrieval → Token Generation → Cookie Setting → Redirect
\`\`\`

**Detailed Steps:**
1. **Phone Number Input**: User enters Iranian mobile number (09xxxxxxxxx)
2. **Client-Side Validation**: Zod schema validates format before submission
3. **Server-Side Validation**: Additional validation on API endpoint
4. **User Lookup**: Check if user exists in SQLite database
5. **User Creation**: If new user, fetch from RandomUser API and save to database
6. **Token Generation**: Create JWT token with 7-day expiration
7. **Cookie Setting**: Set HTTP-only, secure cookie with token
8. **Response**: Return user data and success status
9. **Client Redirect**: Navigate to dashboard

#### **2. Session Management**
- **JWT Tokens**: Secure tokens with phone number payload
- **HTTP-Only Cookies**: Prevents XSS attacks
- **Database Storage**: Tokens stored in SQLite with phone association
- **Automatic Cleanup**: Expired tokens handled by database constraints

#### **3. Authentication Verification**
- **Cookie Extraction**: Server reads auth-token cookie
- **Token Validation**: Verify JWT signature and expiration
- **Database Check**: Confirm token exists in database
- **User Retrieval**: Fetch user data by phone number
- **Response**: Return user data or authentication error

### **Security Implementation**

#### **🔒 Security Measures**
- **HTTP-Only Cookies**: Prevents JavaScript access to tokens
- **Secure Flag**: HTTPS-only in production
- **SameSite Strict**: Prevents CSRF attacks
- **JWT Signing**: Tokens signed with secret key
- **Token Expiration**: 7-day automatic expiration
- **Database Validation**: Double-check token against database
- **Input Validation**: Zod schema validation on client and server

#### **🛡️ Protection Against Common Attacks**
- **XSS Protection**: HTTP-only cookies prevent token theft
- **CSRF Protection**: SameSite cookie policy
- **Token Hijacking**: Database validation prevents token reuse
- **SQL Injection**: Parameterized queries in SQLite
- **Input Validation**: Comprehensive validation at multiple layers

## 🗄️ Database Architecture

### **SQLite Database Schema**

#### **Users Table**
\`\`\`sql
CREATE TABLE users (
  phone TEXT PRIMARY KEY,
  user_data TEXT NOT NULL,
  created_at TEXT NOT NULL
)
\`\`\`

#### **Tokens Table**
\`\`\`sql
CREATE TABLE tokens (
  token TEXT PRIMARY KEY,
  phone TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (phone) REFERENCES users (phone)
)
\`\`\`

### **Data Flow**
1. **User Creation**: Phone number + RandomUser API data stored in users table
2. **Token Storage**: JWT tokens linked to phone numbers in tokens table
3. **Session Validation**: Cross-reference token with database for security
4. **Cleanup**: Automatic token deletion on logout

## 🔄 Authentication Process Details

### **Login Flow** (\`/api/auth/login\`)

\`\`\`typescript
// 1. Validate input with Zod schema
const { phone } = loginSchema.parse(body);

// 2. Create or retrieve user
const user = await createOrGetUser(phone);

// 3. Generate JWT token
const token = await generateToken(phone);

// 4. Set secure HTTP-only cookie
response.cookies.set('auth-token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 // 7 days
});
\`\`\`

### **Session Verification** (\`/api/auth/user\`)

\`\`\`typescript
// 1. Extract token from cookie
const token = request.cookies.get('auth-token')?.value;

// 2. Verify JWT token
const phone = await verifyToken(token);

// 3. Retrieve user from database
const user = await getUserByPhone(phone);

// 4. Return user data
return NextResponse.json({ success: true, user });
\`\`\`

### **Logout Process** (\`/api/auth/logout\`)

\`\`\`typescript
// 1. Get token from cookie
const token = request.cookies.get('auth-token')?.value;

// 2. Delete token from database
if (token) {
  await logout(token);
}

// 3. Clear cookie
response.cookies.set('auth-token', '', {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 0
});
\`\`\`

## 🎨 User Interface Features

### **Authentication UI**
- **Form Validation**: Real-time validation with error display
- **Loading States**: Visual feedback during authentication
- **Error Handling**: Comprehensive error messages
- **Responsive Design**: Works on all device sizes
- **Theme Support**: Light/dark mode toggle

### **Dashboard Protection**
- **Route Guards**: Automatic redirection for unauthenticated users
- **Loading States**: Smooth loading experience
- **Session Persistence**: Maintains login across browser sessions
- **Logout Functionality**: Secure logout with token cleanup

## 🛠 Technical Implementation

### **Frontend Authentication Logic**

#### **AuthContext Provider**
\`\`\`typescript
// Global authentication state management
const AuthContext = createContext<AuthContextType>();

// Login function
const login = async (phone: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone })
  });
  
  const data = await response.json();
  if (data.success) {
    setUser(data.user);
    return { success: true };
  }
};
\`\`\`

#### **Protected Route Logic**
\`\`\`typescript
// Automatic redirection for unauthenticated users
useEffect(() => {
  if (!loading && !user) {
    router.push('/auth');
  }
}, [user, loading, router]);
\`\`\`

### **Backend Authentication Services**

#### **Token Management**
\`\`\`typescript
// Generate JWT token
export async function generateToken(phone: string): Promise<string> {
  const token = jwt.sign({ phone }, JWT_SECRET, { expiresIn: '7d' });
  await db.saveToken(token, phone);
  return token;
}

// Verify JWT token
export async function verifyToken(token: string): Promise<string | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { phone: string };
    const phone = await db.getPhoneByToken(token);
    return phone === decoded.phone ? decoded.phone : null;
  } catch {
    return null;
  }
}
\`\`\`

#### **User Management**
\`\`\`typescript
// Create or retrieve user
export async function createOrGetUser(phone: string): Promise<AuthUser> {
  const existingUser = await getUserByPhone(phone);
  if (existingUser) return existingUser;

  const randomUser = await fetchRandomUser();
  const userWithPhone = { ...randomUser, phone };
  
  await db.saveUser(phone, randomUser);
  return userWithPhone;
}
\`\`\`

## 📊 Key Authentication Features

### **✅ Security Features**
- **JWT Token Authentication**: Secure token-based authentication
- **HTTP-Only Cookies**: XSS protection for token storage
- **Database Token Validation**: Double verification of tokens
- **Input Validation**: Comprehensive validation at multiple layers
- **Secure Cookie Settings**: Production-ready security configuration
- **Token Expiration**: Automatic session cleanup

### **✅ User Experience**
- **Seamless Login**: One-click login with phone number
- **Session Persistence**: Maintains login across browser sessions
- **Automatic Redirects**: Smart navigation based on auth status
- **Loading States**: Visual feedback during authentication
- **Error Handling**: Clear error messages for users

### **✅ Technical Excellence**
- **TypeScript Safety**: Full type safety throughout
- **Database Integration**: SQLite with proper schema design
- **API Design**: RESTful authentication endpoints
- **Error Boundaries**: Comprehensive error handling
- **Scalable Architecture**: Clean separation of concerns

## 🔧 Technical Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Authentication**: JWT with HTTP-only cookies
- **Database**: SQLite with better-sqlite3
- **Validation**: Zod schema validation
- **Styling**: SCSS Modules
- **Icons**: Lucide React
- **State Management**: React Context API

## 🎯 Authentication Flow Summary

1. **User enters phone number** → Client-side validation
2. **Form submission** → Server-side validation
3. **User lookup/creation** → Database operations
4. **Token generation** → JWT creation and storage
5. **Cookie setting** → Secure HTTP-only cookie
6. **Redirect to dashboard** → Protected route access
7. **Session verification** → Automatic auth checks
8. **Logout process** → Token cleanup and cookie removal

---

**Built with ❤️ using Next.js, TypeScript, and SCSS Modules**`;

export default function Home() {
  const t = useTranslations();

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{t('home.title')}</h1>
          <p className={styles.subtitle}>
            {t('home.subtitle')}
          </p>
          <Link href="/auth" className={styles.testButton}>
            <Play size={20} />
            <span>{t('common.testApp')}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </header>
      
      <main className={styles.main}>
        <div className={styles.content}>
          <MarkdownRenderer content={projectDescription} />
        </div>
      </main>
    </div>
  );
}
