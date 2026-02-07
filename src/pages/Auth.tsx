import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, Lock, Sparkles } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
          },
        });
        if (error) throw error;
        toast.success("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Email hoặc mật khẩu không đúng. Vui lòng thử lại hoặc đăng ký tài khoản mới.");
          } else if (error.message.includes("Email not confirmed")) {
            toast.error("Email chưa được xác nhận. Vui lòng đăng ký lại.");
          } else {
            toast.error(error.message);
          }
          return;
        }
        toast.success("Đăng nhập thành công!");
        navigate("/admin");
      }
    } catch (error: any) {
      toast.error(error.message || "Đã xảy ra lỗi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 gradient-primary opacity-20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 gradient-ocean opacity-20 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
      
      <div className="w-full max-w-md animate-fade-in relative z-10">
        <div className="gradient-card rounded-3xl shadow-medium p-8 border border-border/50 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-5 rounded-2xl gradient-primary flex items-center justify-center shadow-glow rotate-3 hover:rotate-0 transition-transform duration-500">
              <Lock className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isSignUp ? "Đăng ký" : "Đăng nhập"}
            </h1>
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              {isSignUp
                ? "Tạo tài khoản admin để quản lý"
                : "Chào mừng trở lại, Admin!"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl border-2 focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold">Mật khẩu</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="h-12 rounded-xl pr-12 border-2 focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="follow"
              className="w-full h-12 text-base rounded-xl"
              disabled={isLoading}
            >
              {isLoading
                ? "Đang xử lý..."
                : isSignUp
                ? "Tạo tài khoản"
                : "Đăng nhập"}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              {isSignUp
                ? "Đã có tài khoản? Đăng nhập ngay"
                : "Chưa có tài khoản? Đăng ký ngay"}
            </button>
          </div>

          {/* Back */}
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              ← Quay lại trang chính
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
