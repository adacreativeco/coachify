import React, { useState } from 'react';
import { useCoachifyStore } from '../stores/coachifyStore';
import { MessageSquare, Send, Plus, Search, Users, Mail, CheckCircle2, Megaphone, Inbox, SendHorizontal, X } from 'lucide-react';
import { toast } from 'sonner';

export default function Messages() {
  const { messages, sendMessage } = useCoachifyStore();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'inbox' | 'sent' | 'team'>('all');
  const [showCompose, setShowCompose] = useState(false);

  const [formData, setFormData] = useState({
    recipient: 'Tüm Takım',
    subject: '',
    content: '',
    sender: 'Okan Buruk (Teknik Direktör)',
    senderRole: 'coach',
    category: 'team' as const,
  });

  const filteredMessages = messages.filter((m) => {
    if (selectedCategory === 'all') return true;
    return m.category === selectedCategory;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject.trim() || !formData.content.trim()) {
      toast.error('Lütfen konu ve mesaj içeriği yazın.');
      return;
    }
    sendMessage(formData);
    toast.success('Mesajınız başarıyla iletildi.');
    setFormData({ ...formData, subject: '', content: '' });
    setShowCompose(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Takım İletişim Hattı</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Takım İçi Mesajlaşma & Duyurular</h1>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1">
            Teknik heyet, yönetim ve oyuncular arası anlık koordinasyon ve duyuru kanalı.
          </p>
        </div>
        <button
          onClick={() => setShowCompose(!showCompose)}
          className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{showCompose ? 'Kapat' : 'Yeni Mesaj Yaz'}</span>
        </button>
      </div>

      {/* Compose Form */}
      {showCompose && (
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 space-y-4 backdrop-blur-xl shadow-2xl animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Mesaj Oluştur</span>
            </h3>
            <button onClick={() => setShowCompose(false)} className="text-neutral-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSendMessage} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Alıcı Kanalı</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-950 border border-white/[0.08] rounded-xl text-white focus:border-emerald-500 outline-none"
                >
                  <option value="team">Tüm Takım (Genel Duyuru)</option>
                  <option value="inbox">Teknik Heyet</option>
                  <option value="sent">Kulüp Yönetimi</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Konu Başlığı</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Örn: Hafta Sonu Maç Saati Değişikliği"
                  className="w-full px-3 py-2 bg-slate-950 border border-white/[0.08] rounded-xl text-white focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Mesaj Metni</label>
              <textarea
                rows={3}
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Mesajınızı buraya yazın..."
                className="w-full px-3 py-2 bg-slate-950 border border-white/[0.08] rounded-xl text-white focus:border-emerald-500 outline-none resize-none"
              />
            </div>

            <div className="flex justify-end space-x-2.5">
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl shadow flex items-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gönder</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Messages List */}
      <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-wrap gap-2 border-b border-white/[0.06] pb-3">
          {[
            { id: 'all', label: 'Tümü', icon: Mail },
            { id: 'team', label: 'Takım Duyuruları', icon: Megaphone },
            { id: 'inbox', label: 'Gelenler', icon: Inbox },
            { id: 'sent', label: 'Gönderilenler', icon: SendHorizontal },
          ].map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        <div className="divide-y divide-white/[0.06]">
          {filteredMessages.map((msg) => (
            <div key={msg.id} className="py-4 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white text-sm">{msg.sender}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-neutral-400">
                    {msg.recipient}
                  </span>
                </div>
                <span className="text-neutral-500 font-mono text-[11px]">{msg.timestamp}</span>
              </div>
              <div className="text-sm font-semibold text-emerald-400">{msg.subject}</div>
              <p className="text-xs text-neutral-300 leading-relaxed">{msg.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
