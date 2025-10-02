'use client';

import { useState, useEffect } from 'react';
import { Mail, Lock, LogIn, Chrome, User, KeyRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';

export default function AndroidLoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard');
      } else {
        setIsAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const getFirebaseErrorMessage = (error: any) => {
    // Log the full error for debugging
    console.error("Firebase Auth Error:", error);
    const errorCode = error.code;

    switch (errorCode) {
      case 'auth/invalid-email':
        return 'البريد الإلكتروني غير صالح.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'البريد الإلكتروني أو كلمة المرور غير صحيحة.';
      case 'auth/email-already-in-use':
        return 'هذا البريد الإلكتروني مستخدم بالفعل.';
      case 'auth/weak-password':
        return 'كلمة المرور ضعيفة جدًا. يجب أن تكون 6 أحرف على الأقل.';
      case 'auth/popup-closed-by-user':
        return 'تم إلغاء عملية تسجيل الدخول.';
      default:
        // Show the actual error code from Firebase to help debug the root cause.
        return `فشل: خطأ غير متوقع. الرمز: ${errorCode || 'UNKNOWN'}`;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('نجاح! جارٍ إعادة توجيهك...');
      // The useEffect with onAuthStateChanged will handle the redirect
    } catch (error: any) {
      setMessage(getFirebaseErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('فشل: كلمتا المرور غير متطابقتين.');
      return;
    }
    
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
        await sendEmailVerification(userCredential.user);
      }
      setMessage('نجاح! تم إنشاء حسابك. لقد أرسلنا رابط تحقق إلى بريدك الإلكتروني، يرجى الضغط عليه لتفعيل حسابك.');
      setIsLoading(false);
      setIsRegistering(false); 
      // Clear fields after registration
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      setMessage(getFirebaseErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setMessage('');
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setMessage('نجاح! جارٍ إعادة توجيهك...');
      // The useEffect with onAuthStateChanged will handle the redirect
    } catch (error: any) {
      setMessage(getFirebaseErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-primary">Bodi</h1>
          <p className="mt-2 text-muted-foreground">
            {isRegistering ? 'أنشئ حسابًا جديدًا للبدء' : 'أهلاً بك، قم بتسجيل الدخول للمتابعة'}
          </p>
        </div>

        {isRegistering ? (
          <form onSubmit={handleRegister} className="bg-card p-6 rounded-2xl shadow-2xl space-y-5 border border-border">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input type="text" placeholder="الاسم الكامل" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-input rounded-lg py-3 pr-4 pl-10 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" required disabled={isLoading} />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-input rounded-lg py-3 pr-4 pl-10 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" required disabled={isLoading} />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-input rounded-lg py-3 pr-4 pl-10 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" required disabled={isLoading} />
            </div>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input type="password" placeholder="تأكيد كلمة المرور" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-input rounded-lg py-3 pr-4 pl-10 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" required disabled={isLoading} />
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 px-4 rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card focus:ring-primary transition-transform transform hover:scale-105 disabled:opacity-50 disabled:scale-100" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
                  <span>جاري الإنشاء...</span>
                </>
              ) : (
                <span>إنشاء حساب</span>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="bg-card p-6 rounded-2xl shadow-2xl space-y-6 border border-border">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-input rounded-lg py-3 pr-4 pl-10 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" required disabled={isLoading}/>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-input rounded-lg py-3 pr-4 pl-10 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" required disabled={isLoading}/>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <input id="remember-me" type="checkbox" className="h-4 w-4 rounded border-border bg-input text-primary focus:ring-primary" />
                <label htmlFor="remember-me" className="text-muted-foreground">تذكرني</label>
              </div>
              <a href="#" className="font-medium text-primary/80 hover:text-primary">نسيت كلمة المرور؟</a>
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 px-4 rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card focus:ring-primary transition-transform transform hover:scale-105 disabled:opacity-50 disabled:scale-100" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
                  <span>جاري التحقق...</span>
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>تسجيل الدخول</span>
                </>
              )}
            </button>
             <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">أو</span>
              </div>
            </div>
            <button type="button" onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-medium py-3 px-4 rounded-lg hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card focus:ring-secondary" disabled={isLoading}>
              <Chrome className="h-5 w-5" />
              <span>المتابعة باستخدام جوجل</span>
            </button>
          </form>
        )}
        
        {message && (
          <p className={`text-center text-sm pt-4 ${message.startsWith('نجاح') ? 'text-green-400' : 'text-red-400'}`}>{message}</p>
        )}

        <div className="text-center mt-6 text-sm">
          <p className="text-muted-foreground">
            {isRegistering ? 'لديك حساب بالفعل؟' : 'ليس لديك حساب؟'}{' '}
            <button onClick={() => { setIsRegistering(!isRegistering); setMessage(''); }} className="font-bold text-primary hover:underline bg-transparent border-none p-0">
              {isRegistering ? 'سجل الدخول' : 'أنشئ حسابًا الآن'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
