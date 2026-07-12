import React, { useState } from 'react';
import { 
  Trash2, 
  Mail, 
  ShieldAlert, 
  CheckCircle, 
  AlertTriangle, 
  ArrowLeft,
  Info 
} from 'lucide-react';
import { db, auth } from './lib/firebase';
import { collection, addDoc, serverTimestamp, doc, deleteDoc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';

interface DeleteAccountPageProps {
  lang: 'en' | 'tr';
  setLang: (lang: 'en' | 'tr') => void;
  currentUser: any;
  onBack: () => void;
}

const DeleteAccountPage: React.FC<DeleteAccountPageProps> = ({ 
  lang, 
  setLang, 
  currentUser,
  onBack
}) => {
  const [email, setEmail] = useState(currentUser?.email || '');
  const [reason, setReason] = useState('');
  const [options, setOptions] = useState({
    profile: true,
    businesses: true,
    announcements: true,
    messages: true,
  });
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggleOption = (key: keyof typeof options) => {
    setOptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError(lang === 'en' ? 'Please provide a valid registered email address.' : 'Lütfen geçerli bir kayıtlı e-posta adresi girin.');
      return;
    }
    if (!confirmed) {
      setError(lang === 'en' ? 'You must confirm that you understand this action is permanent.' : 'Bu işlemin kalıcı olduğunu anladığınızı onaylamanız gerekmektedir.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const selectedOptions = Object.keys(options).filter(k => options[k as keyof typeof options]);
      
      // Add secure deletion request log
      await addDoc(collection(db, 'deletion_requests'), {
        email: email.trim(),
        reason: reason.trim(),
        deleteOptions: selectedOptions,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      // Attempt to immediately delete the Firestore user document if Profile deletion is checked
      if (options.profile) {
        const targetUserId = currentUser?.id || auth.currentUser?.uid;
        if (targetUserId) {
          try {
            await deleteDoc(doc(db, 'users', targetUserId));
            console.log("Successfully deleted Firestore users document:", targetUserId);
          } catch (dbErr: any) {
            console.warn("Firestore user document auto-deletion failed:", dbErr);
          }
        }
      }

      // Attempt to immediately delete user from Firebase Authentication if signed in as that email
      if (auth.currentUser && auth.currentUser.email && auth.currentUser.email.trim().toLowerCase() === email.trim().toLowerCase()) {
        try {
          await deleteUser(auth.currentUser);
        } catch (authErr: any) {
          console.warn("Firebase Auth auto-deletion warning (requires recent sign in):", authErr);
          // Fallback: trigger signOut to ensure their active session is safely terminated
          await auth.signOut();
        }
      }

      setSuccess(true);
    } catch (err: any) {
      console.error("Error creating deletion request: ", err);
      setError(
        lang === 'en' 
          ? 'Error submitting deletion request. Please try again later.' 
          : 'Silme talebi gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800 p-6 md:p-12 selection:bg-primary-mid/10">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-8 gap-4">
          <div className="text-left">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-xs font-black uppercase tracking-wider mb-3 cursor-pointer"
            >
              <ArrowLeft size={18} />
              {lang === 'en' ? 'Back' : 'Geri Dön'}
            </button>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
              {lang === 'en' ? 'Delete Account & Associated Data' : 'Hesap ve Verileri Kalıcı Olarak Sil'}
            </h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">
              {lang === 'en' ? 'Goofind Canada Data Privacy Safe-port' : 'Goofind Kanada Veri Gizliliği Güvencesi'}
            </p>
          </div>
          
          {/* Language Selector */}
          <div className="flex gap-2 self-start md:self-center">
            <button 
              onClick={() => setLang('tr')} 
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${lang === 'tr' ? 'bg-[#2563EB] text-white shadow-sm' : 'bg-slate-200/65 text-slate-600 hover:bg-slate-200'}`}
            >
              Türkçe
            </button>
            <button 
              onClick={() => setLang('en')} 
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${lang === 'en' ? 'bg-[#2563EB] text-white shadow-sm' : 'bg-slate-200/65 text-slate-600 hover:bg-slate-200'}`}
            >
              English
            </button>
          </div>
        </div>

        {/* Success Screen */}
        {success ? (
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner border border-emerald-100">
              <CheckCircle size={38} />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                {lang === 'en' ? 'Deletion Request Received' : 'Silme Talebiniz Alındı'}
              </h2>
              <p className="text-sm text-slate-500 max-w-lg mx-auto font-medium leading-relaxed">
                {lang === 'en' 
                  ? `An authorization record was saved for ${email}. Our customer trust and policy operations team will verify your details and remove all chosen profile archives, catalog registries, and associated communication parameters within 48 hours.` 
                  : `${email} e-posta adresi için silme talebi kaydı oluşturuldu. Destek ve gizlilik ekibimiz 48 saat içinde veritabanı kayıtlarınızı inceleyip talebinizi tamamlayacaktır.`}
              </p>
            </div>
            <div className="pt-4">
              <button 
                onClick={onBack}
                className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-black uppercase tracking-widest py-3.5 px-8 rounded-xl transition-all active:scale-95 shadow-lg"
              >
                {lang === 'en' ? 'Back to App' : 'Uygulamaya Dön'}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
            {/* Form Column */}
            <div className="lg:col-span-2 space-y-6">
              <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-md space-y-6">
                <div>
                  <h2 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-3">
                    <Trash2 size={22} className="text-red-500" />
                    {lang === 'en' ? 'Data Deletion Request' : 'Veri Silme İstemi Formu'}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">
                    {lang === 'en' 
                      ? 'This automated request triggers a priority wipe of your databases from our active memory blocks and long-term secure Firestore buckets. Please verify details carefully.' 
                      : 'Bu otomatik form, kayıtlarınızın aktif sunucu belleklerinden ve uzun vadeli güvenli veritabanlarımızdan kalıcı olarak kaldırılması sürecini başlatır. Bilgilerinizi kontrol ederek eksiksiz doldurun.'}
                  </p>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="delete-email" className="text-[14px] font-black text-slate-400 uppercase tracking-widest">
                    {lang === 'en' ? 'Registered Email Address *' : 'Kayıtlı E-posta Adresi *'}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input 
                      id="delete-email"
                      type="email" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder={lang === 'en' ? 'example@email.com' : 'ornek@eposta.com'}
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all shadow-inner"
                      required
                    />
                  </div>
                </div>

                {/* Option Toggles */}
                <div className="space-y-3">
                  <span className="text-[14px] font-black text-slate-400 uppercase tracking-widest block">
                    {lang === 'en' ? 'Specify the data you want to delete' : 'Hangi verilerinizin silinmesini istersiniz?'}
                  </span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer select-none hover:bg-slate-100/50 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={options.profile} 
                        onChange={() => handleToggleOption('profile')}
                        className="mt-0.5 rounded accent-[#2563EB] cursor-pointer" 
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900">{lang === 'en' ? 'Profile & Account Details' : 'Profil ve Hesap Bilgileri'}</span>
                        <span className="text-[14px] text-slate-500 font-medium leading-normal mt-0.5">{lang === 'en' ? 'Email, credentials, login logs' : 'E-posta, giriş kayıtları, şifre hashleri'}</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer select-none hover:bg-slate-100/50 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={options.businesses} 
                        onChange={() => handleToggleOption('businesses')}
                        className="mt-0.5 rounded accent-[#2563EB] cursor-pointer" 
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900">{lang === 'en' ? 'Business Listings' : 'Kayıtlı İşletme Detayları'}</span>
                        <span className="text-[14px] text-slate-500 font-medium leading-normal mt-0.5">{lang === 'en' ? 'Stores, pictures, descriptions, reviews' : 'Eklenen dükkanlar, fotoğraflar, yorumlar'}</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer select-none hover:bg-slate-100/50 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={options.announcements} 
                        onChange={() => handleToggleOption('announcements')}
                        className="mt-0.5 rounded accent-[#2563EB] cursor-pointer" 
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900">{lang === 'en' ? 'Announcements & Events' : 'İlanlar ve Etkinlikler'}</span>
                        <span className="text-[14px] text-slate-500 font-medium leading-normal mt-0.5">{lang === 'en' ? 'Posted announcements and notifications' : 'Gönderilen sosyal ilanlar ve oluşturulan ilan detayları'}</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer select-none hover:bg-slate-100/50 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={options.messages} 
                        onChange={() => handleToggleOption('messages')}
                        className="mt-0.5 rounded accent-[#2563EB] cursor-pointer" 
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900">{lang === 'en' ? 'Conversations & Logs' : 'Sohbetler ve Arama Kayıtları'}</span>
                        <span className="text-[14px] text-slate-500 font-medium leading-normal mt-0.5">{lang === 'en' ? 'Messages, media attachments' : 'Topluluk sohbet mesajları ve gönderilen resimler'}</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Reason */}
                <div className="space-y-2">
                  <label htmlFor="delete-reason" className="text-[14px] font-black text-slate-400 uppercase tracking-widest">
                    {lang === 'en' ? 'Tell us why you are leaving (Optional)' : 'Ayrılma Sebebiniz (İsteğe Bağlı)'}
                  </label>
                  <textarea 
                    id="delete-reason"
                    rows={3} 
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    placeholder={lang === 'en' ? 'I do not use this app anymore...' : 'Uygulamayı artık verimli kullanmıyorum...'}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all shadow-inner resize-none"
                  />
                </div>

                {/* Confirmation Box */}
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3.5">
                  <div className="mt-0.5 text-red-500 shrink-0">
                    <ShieldAlert size={22} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-black uppercase text-red-700 tracking-tight">{lang === 'en' ? 'Irreversible Action' : 'Geri Dönülemez İşlem'}</span>
                    <p className="text-[14px] leading-normal font-semibold text-red-600/80 mt-0.5">
                      {lang === 'en' 
                        ? 'All associated datasets, stored bookmarks, and authorization indices will be purged. This action is final.' 
                        : 'Kalıcı silme işlemi bittikten sonra yedeklerden veya sunucularımızdan hiçbir profil verisine yeniden ulaşılamaz.'}
                    </p>
                    <label className="flex items-center gap-2 mt-3 p-1 rounded cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={confirmed}
                        onChange={e => setConfirmed(e.target.checked)}
                        className="rounded accent-red-600 cursor-pointer w-4 h-4 shrink-0"
                      />
                      <span className="text-[14px] text-red-950 font-black uppercase tracking-wider">
                        {lang === 'en' ? 'I understand and authorize data purge *' : 'Kalıcı silme işlemini anladım ve onaylıyorum *'}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-2.5 text-rose-700 text-xs font-semibold">
                    <AlertTriangle size={19} className="mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit button */}
                <div className="flex gap-4">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-black uppercase tracking-widest py-4 px-6 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:scale-100"
                  >
                    <Trash2 size={18} />
                    {loading ? (lang === 'en' ? 'Processing...' : 'Sürüyor...') : (lang === 'en' ? 'Request Instant Deletion' : 'Kalıcı Silme Talebi Gönder')}
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar Guidelines */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4 text-left">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  <Info size={20} className="text-slate-405" />
                  {lang === 'en' ? 'Security & Rules' : 'Güvenlik ve Kurallar'}
                </h3>
                <div className="space-y-3.5 text-[15px] font-semibold text-slate-500 leading-relaxed">
                  <p>
                    {lang === 'en' 
                      ? 'Goofind is committed to safeguarding user-data in accordance with CASL and pipeda requirements.' 
                      : 'Goofind, tüm kullanıcı kayıtlarını CASL ve PIPEDA yönergeleri çerçevesinde mutlak gizlilik standartlarıyla korur.'}
                  </p>
                  <p>
                    {lang === 'en' 
                      ? 'If you have an active listed business on our directory, deleting your account will simultaneously suspend those active phone indices, website lists, and verification icons.' 
                      : 'Eğer dizinimizde kayıtlı bir işletmeniz varsa, hesabınızın silinmesiyle birlikte o işletmenin telefon bağlantıları, ilanları ve doğrulanma rozetleri de otomatik olarak yayından kaldırılır.'}
                  </p>
                  <p>
                    {lang === 'en' 
                      ? 'No data is shared or retained for profiling or ads after user erasure processing.' 
                      : 'Hesap silme işleminin ardından hiçbir bilginiz reklam, indeksleme veya istatistik amacıyla saklanmaz ve tam şeffaflıkla yok edilir.'}
                  </p>
                </div>
              </div>

              {/* Status block */}
              {currentUser ? (
                <div className="bg-[#2563EB]/5 border border-[#2563EB]/10 p-6 rounded-[2rem] space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2563EB]/10 text-[#2563EB] rounded-full text-[13px] font-black uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-ping" />
                    {lang === 'en' ? 'Active Session detected' : 'Aktif Oturum Algılandı'}
                  </span>
                  <div className="text-[15px] text-slate-600 leading-normal font-semibold">
                    <p className="font-extrabold text-slate-800">{lang === 'en' ? 'Profile Email:' : 'Hesap E-postası:'}</p>
                    <p className="text-[#2563EB] break-all">{currentUser.email}</p>
                    <p className="font-extrabold text-slate-800 mt-2">{lang === 'en' ? 'Sign In Provider:' : 'Bağlantı Türü:'}</p>
                    <p className="text-slate-550 capitalize">{currentUser.providerData?.[0]?.providerId || 'email'}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-500/5 border border-amber-500/10 p-6 rounded-[2rem] space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-600 rounded-full text-[13px] font-black uppercase tracking-widest">
                    {lang === 'en' ? 'Guest / Deactivated' : 'Ziyaretçi / Giriş Yapılmadı'}
                  </span>
                  <p className="text-[15px] text-slate-500 leading-normal font-semibold">
                    {lang === 'en' 
                      ? 'You are accessing this form anonymously. Please ensure you type your exact registered email address, as mismatched entries cannot be processed.' 
                      : 'Bu sayfaya üye girişi yapmadan ulaştınız. Lütfen kayıt oluştururken kullandığınız e-posta adresini birebir doğru girdiğinizden emin olun.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="pt-8 border-t border-slate-200 text-center">
          <p className="text-[14px] text-slate-400 font-extrabold uppercase tracking-widest">
            © 2026 Goofind Corp. Canada. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountPage;
