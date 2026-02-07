import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  User, Music, FileText, CreditCard, Video, 
  LogOut, Save, Plus, Trash2, ArrowLeft 
} from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface ProfileSettings {
  id: string;
  display_name: string;
  username: string;
  bio: string;
  avatar_url: string;
  following: number;
  followers: number;
  likes: number;
  website_url: string;
  is_top: boolean;
  has_subscription: boolean;
  contact_url: string;
}

interface Post {
  id: string;
  thumbnail_url: string;
  is_video: boolean;
  views: number;
  date: string | null;
}

interface MusicTrack {
  id: string;
  title: string;
  thumbnail_url: string;
  used_by_videos: number;
  duration: string;
}

interface PaymentInfo {
  id: string;
  bank_name: string;
  account_number: string;
  account_holder: string;
  momo_number: string;
  zalopay_number: string;
  notes: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Data states
  const [profile, setProfile] = useState<ProfileSettings | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [music, setMusic] = useState<MusicTrack[]>([]);
  const [payment, setPayment] = useState<PaymentInfo | null>(null);

  // New item states
  const [newPost, setNewPost] = useState({ thumbnail_url: "", views: 0 });
  const [newMusic, setNewMusic] = useState({ title: "", thumbnail_url: "", duration: "01:00" });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      } else {
        fetchAllData();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from("profile_settings")
        .select("*")
        .single();
      if (profileData) setProfile({
        ...profileData,
        contact_url: (profileData as any).contact_url || "",
      });

      // Fetch posts
      const { data: postsData } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (postsData) setPosts(postsData);

      // Fetch music
      const { data: musicData } = await supabase
        .from("music_tracks")
        .select("*")
        .order("created_at", { ascending: false });
      if (musicData) setMusic(musicData);

      // Fetch payment
      const { data: paymentData } = await supabase
        .from("payment_info")
        .select("*")
        .single();
      if (paymentData) setPayment(paymentData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const saveProfile = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profile_settings")
        .update(profile)
        .eq("id", profile.id);
      if (error) throw error;
      toast.success("Đã lưu thông tin profile!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const savePayment = async () => {
    if (!payment) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("payment_info")
        .update(payment)
        .eq("id", payment.id);
      if (error) throw error;
      toast.success("Đã lưu thông tin thanh toán!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const addPost = async () => {
    if (!newPost.thumbnail_url) {
      toast.error("Vui lòng nhập URL ảnh");
      return;
    }
    try {
      const { data, error } = await supabase
        .from("posts")
        .insert([{ ...newPost, is_video: true }])
        .select()
        .single();
      if (error) throw error;
      setPosts([data, ...posts]);
      setNewPost({ thumbnail_url: "", views: 0 });
      toast.success("Đã thêm bài viết!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw error;
      setPosts(posts.filter((p) => p.id !== id));
      toast.success("Đã xóa bài viết!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const addMusic = async () => {
    if (!newMusic.title || !newMusic.thumbnail_url) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    try {
      const { data, error } = await supabase
        .from("music_tracks")
        .insert([newMusic])
        .select()
        .single();
      if (error) throw error;
      setMusic([data, ...music]);
      setNewMusic({ title: "", thumbnail_url: "", duration: "01:00" });
      toast.success("Đã thêm nhạc!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const deleteMusic = async (id: string) => {
    try {
      const { error } = await supabase.from("music_tracks").delete().eq("id", id);
      if (error) throw error;
      setMusic(music.filter((m) => m.id !== id));
      toast.success("Đã xóa nhạc!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Đăng xuất
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <Tabs defaultValue="music" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="music" className="gap-2">
              <Music className="w-4 h-4" />
              <span className="hidden sm:inline">Nhạc</span>
            </TabsTrigger>
            <TabsTrigger value="posts" className="gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Bài viết</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Thanh toán</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
          </TabsList>

          {/* Music Tab */}
          <TabsContent value="music" className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold mb-4">Thêm nhạc mới</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <Label>Tên bài hát</Label>
                  <Input
                    placeholder="Tên bài hát..."
                    value={newMusic.title}
                    onChange={(e) => setNewMusic({ ...newMusic, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>URL ảnh bìa</Label>
                  <Input
                    placeholder="https://..."
                    value={newMusic.thumbnail_url}
                    onChange={(e) => setNewMusic({ ...newMusic, thumbnail_url: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Thời lượng</Label>
                  <Input
                    placeholder="01:00"
                    value={newMusic.duration}
                    onChange={(e) => setNewMusic({ ...newMusic, duration: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={addMusic} className="mt-4 gap-2">
                <Plus className="w-4 h-4" />
                Thêm nhạc
              </Button>
            </div>

            <div className="space-y-3">
              {music.map((track) => (
                <div
                  key={track.id}
                  className="flex items-center gap-4 bg-card rounded-lg border border-border p-4"
                >
                  <img
                    src={track.thumbnail_url}
                    alt={track.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{track.title}</p>
                    <p className="text-sm text-muted-foreground">{track.duration}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMusic(track.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {music.length === 0 && (
                <p className="text-center text-muted-foreground py-8">Chưa có nhạc nào</p>
              )}
            </div>
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold mb-4">Đăng bài mới</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>URL ảnh/video thumbnail</Label>
                  <Input
                    placeholder="https://..."
                    value={newPost.thumbnail_url}
                    onChange={(e) => setNewPost({ ...newPost, thumbnail_url: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Lượt xem ban đầu</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={newPost.views}
                    onChange={(e) => setNewPost({ ...newPost, views: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <Button onClick={addPost} className="mt-4 gap-2">
                <Plus className="w-4 h-4" />
                Đăng bài
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {posts.map((post) => (
                <div key={post.id} className="relative aspect-[3/4] group">
                  <img
                    src={post.thumbnail_url}
                    alt=""
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deletePost(post.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-1 left-1 text-primary-foreground text-xs bg-black/50 px-1 rounded">
                    {post.views} views
                  </div>
                </div>
              ))}
              {posts.length === 0 && (
                <div className="col-span-3 text-center text-muted-foreground py-8">
                  Chưa có bài viết nào
                </div>
              )}
            </div>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment" className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold mb-4">Thông tin thanh toán</h2>
              {payment && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Tên ngân hàng</Label>
                      <Input
                        placeholder="Vietcombank, Techcombank..."
                        value={payment.bank_name}
                        onChange={(e) => setPayment({ ...payment, bank_name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Số tài khoản</Label>
                      <Input
                        placeholder="0123456789"
                        value={payment.account_number}
                        onChange={(e) => setPayment({ ...payment, account_number: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Chủ tài khoản</Label>
                    <Input
                      placeholder="NGUYEN VAN A"
                      value={payment.account_holder}
                      onChange={(e) => setPayment({ ...payment, account_holder: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Số MoMo</Label>
                      <Input
                        placeholder="0912345678"
                        value={payment.momo_number}
                        onChange={(e) => setPayment({ ...payment, momo_number: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Số ZaloPay</Label>
                      <Input
                        placeholder="0912345678"
                        value={payment.zalopay_number}
                        onChange={(e) => setPayment({ ...payment, zalopay_number: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Ghi chú</Label>
                    <Textarea
                      placeholder="Thông tin thêm..."
                      value={payment.notes}
                      onChange={(e) => setPayment({ ...payment, notes: e.target.value })}
                    />
                  </div>
                  <Button onClick={savePayment} disabled={saving} className="gap-2">
                    <Save className="w-4 h-4" />
                    {saving ? "Đang lưu..." : "Lưu thông tin"}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold mb-4">Thông tin Profile</h2>
              {profile && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Tên hiển thị</Label>
                      <Input
                        value={profile.display_name}
                        onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Username</Label>
                      <Input
                        value={profile.username}
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Bio</Label>
                    <Textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>URL Avatar</Label>
                    <Input
                      placeholder="https://..."
                      value={profile.avatar_url}
                      onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Website URL</Label>
                    <Input
                      placeholder="https://..."
                      value={profile.website_url}
                      onChange={(e) => setProfile({ ...profile, website_url: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Liên kết Message (Zalo, Facebook...)</Label>
                    <Input
                      placeholder="https://zalo.me/... hoặc https://m.me/..."
                      value={profile.contact_url || ""}
                      onChange={(e) => setProfile({ ...profile, contact_url: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <Label>Following</Label>
                      <Input
                        type="number"
                        value={profile.following}
                        onChange={(e) => setProfile({ ...profile, following: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Label>Followers</Label>
                      <Input
                        type="number"
                        value={profile.followers}
                        onChange={(e) => setProfile({ ...profile, followers: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Label>Likes</Label>
                      <Input
                        type="number"
                        value={profile.likes}
                        onChange={(e) => setProfile({ ...profile, likes: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={profile.is_top}
                        onChange={(e) => setProfile({ ...profile, is_top: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Hiển thị badge TOP</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={profile.has_subscription}
                        onChange={(e) => setProfile({ ...profile, has_subscription: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Hiển thị Subscription</span>
                    </label>
                  </div>
                  <Button onClick={saveProfile} disabled={saving} className="gap-2">
                    <Save className="w-4 h-4" />
                    {saving ? "Đang lưu..." : "Lưu thông tin"}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
