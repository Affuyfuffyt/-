import { Mail, Lock, LogIn, Chrome } from 'lucide-react';

export default function AndroidLoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-primary">Bodi</h1>
          <p className="mt-2 text-muted-foreground">أهلاً بك، قم بتسجيل الدخول للمتابعة</p>
        </div>

        <div className="bg-card p-6 rounded-2xl shadow-2xl space-y-6 border border-border">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              id="email"
              type="email"
              placeholder="البريد الإلكتروني"
              className="w-full bg-input rounded-lg py-3 pr-4 pl-10 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              id="password"
              type="password"
              placeholder="كلمة المرور"
              className="w-full bg-input rounded-lg py-3 pr-4 pl-10 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
             <div className="flex items-center gap-2">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-border bg-input text-primary focus:ring-primary"
              />
              <label htmlFor="remember-me" className="text-muted-foreground">
                تذكرني
              </label>
            </div>
            <a href="#" className="font-medium text-primary/80 hover:text-primary">
              نسيت كلمة المرور؟
            </a>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 px-4 rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card focus:ring-primary transition-transform transform hover:scale-105"
          >
            <LogIn className="h-5 w-5" />
            <span>تسجيل الدخول</span>
          </button>
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">أو</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-medium py-3 px-4 rounded-lg hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card focus:ring-secondary"
          >
            <Chrome className="h-5 w-5" />
            <span>المتابعة باستخدام جوجل</span>
          </button>
        </div>
        
        <div className="text-center mt-6 text-sm">
          <p className="text-muted-foreground">
            ليس لديك حساب؟{' '}
            <a href="#" className="font-bold text-primary hover:underline">
              أنشئ حسابًا الآن
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
