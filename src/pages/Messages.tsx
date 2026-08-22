import { useState } from 'react';
import { useCoachifyStore } from '../stores/coachifyStore';
import { MessageSquare, Send, Plus, Search, Users, Mail, CheckCircle2 } from 'lucide-react';
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
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Takım İçi Mesajlaşma & Duyurular</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Teknik heyet, yönetim ve oyuncular arası anlık koordinasyon ve duyuru kanalı.
          </p>
        </div>
        <button
          onClick={() => setShowCompose(!showCompose)}
          className="inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          {showCompose ? 'Kapat' : 'Yeni Mesaj Yaz'}
        </button>
      </div>

      {/* Compose Form */}
      {showCompose && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-500/30 p-6 space-y-4 animate-in fade-in duration-200">
          <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center">
            <Send className="w-4 h-4 mr-2 text-emerald-600" /> Mesaj Oluştur
          </h3>

          <form onSubmit={handleSendMessage} className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Alıcı Kanalı</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                >
                  <option value="team">📢 Tüm Takım (Genel Duyuru)</option>
                  <option value="inbox">📩 Teknik Heyet</option>
                  <option value="sent">💼 Kulüp Yönetimi</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Konu Başlığı</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Örn: Hafta Sonu Maç Saati Değişikliği"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Mesaj Metni</label>
              <textarea
                rows={3}
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Mesajınızı buraya yazın..."
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white resize-none"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow flex items-center"
              >
                <Send className="w-3.5 h-3.5 mr-1.5" /> Gönder
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Messages List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700 pb-3">
          {[
            { id: 'all', label: 'Tümü' },
            { id: 'team', label: '📢 Takım Duyuruları' },
            { id: 'inbox', label: '📩 Gelenler' },
            { id: 'sent', label: '📤 Gönderilenler' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {filteredMessages.map((msg) => (
            <div key={msg.id} className="py-4 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-900 dark:text-white text-sm">{msg.sender}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 font-semibold text-gray-600 dark:text-gray-300">
                    {msg.recipient}
                  </span>
                </div>
                <span className="text-gray-400 font-semibold text-[11px]">{msg.timestamp}</span>
              </div>
              <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{msg.subject}</div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{msg.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
