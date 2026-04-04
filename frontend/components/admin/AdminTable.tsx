'use client';

import { useEffect, useState, useCallback } from 'react';

const PADI = {
  blue: '#0098B3',
  blueDark: '#007591',
  blueLight: '#E6F4F7',
  yellow: '#FFB600',
  orange: '#FF6B00',
  dark: '#1A1A2E',
  gray: '#6B7280',
};

type Field = {
  key: string;
  label: string;
  type: string;
  options?: { value: string; label: string }[];
  optionsUrl?: string;
  required?: boolean;
  placeholder?: string;
};

type Entity = { id: number; [key: string]: any };
type Column = { key: string; label: string; render?: (v: any, row: Entity) => React.ReactNode };

type Props = { title: string; apiPath: string; fields: Field[]; columns: Column[] };

export default function AdminTable({ title, apiPath, fields, columns }: Props) {
  const [items, setItems] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Entity | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [dynamicOptions, setDynamicOptions] = useState<Record<string, any[]>>({});
  const [toast, setToast] = useState('');

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(apiPath);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } finally { setLoading(false); }
  }, [apiPath]);

  useEffect(() => { loadItems(); }, [loadItems]);

  useEffect(() => {
    fields.forEach(f => {
      if (f.optionsUrl && !dynamicOptions[f.key]) {
        fetch(f.optionsUrl)
          .then(r => r.json())
          .then(data => { if (data) setDynamicOptions(prev => ({ ...prev, [f.key]: Array.isArray(data) ? data : [] })); })
          .catch(() => {});
      }
    });
  }, [fields]);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2500); }

  function openAdd() {
    setEditItem(null);
    const init: Record<string, any> = {};
    fields.forEach(f => { init[f.key] = f.type === 'checkbox' ? false : ''; });
    setForm(init);
    setError('');
    setShowModal(true);
  }

  function openEdit(item: Entity) {
    setEditItem(item);
    const init: Record<string, any> = {};
    fields.forEach(f => { init[f.key] = f.type === 'checkbox' ? !!item[f.key] : (item[f.key] ?? ''); });
    setForm(init);
    setError('');
    setShowModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const url = editItem ? `${apiPath}?id=${editItem.id}` : apiPath;
      const method = editItem ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (res.ok) { setShowModal(false); loadItems(); showToast(editItem ? '✅ 更新成功' : '✅ 新增成功'); }
      else setError(data.error || '保存失败');
    } catch { setError('网络错误'); } finally { setSaving(false); }
  }

  async function handleDelete(item: Entity) {
    if (!confirm(`确定删除「${item.name_zh || item.name_en || item.id}」？`)) return;
    const res = await fetch(`${apiPath}?id=${item.id}`, { method: 'DELETE' });
    if (res.ok) { loadItems(); showToast('✅ 删除成功'); }
  }

  function setField(key: string, value: any) { setForm(prev => ({ ...prev, [key]: value })); }

  return (
    <div className="space-y-5">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-5 py-3 rounded-xl text-sm font-medium text-white shadow-xl flex items-center gap-2" style={{background: PADI.dark}}>
          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{color: PADI.dark}}>{title}</h1>
          <p className="text-sm mt-0.5" style={{color: PADI.gray}}>共 {items.length} 条记录</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-95"
          style={{background: PADI.blue}}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          新增记录
        </button>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden" style={{borderColor: '#F0F0F0'}}>
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" style={{borderColor: `${PADI.blue} transparent transparent transparent`}} />
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <svg className="w-12 h-12 mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-sm">暂无数据</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{background: '#F8F9FA'}}>
                  {columns.map(col => (
                    <th key={col.key} className="text-left text-xs font-semibold uppercase tracking-wider px-5 py-3.5" style={{color: '#9CA3AF'}}>{col.label}</th>
                  ))}
                  <th className="text-right text-xs font-semibold uppercase tracking-wider px-5 py-3.5" style={{color: '#9CA3AF'}}>操作</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id} className="border-t hover:bg-gray-50/60 transition-colors" style={{borderColor: '#F0F0F0'}}>
                    {columns.map(col => (
                      <td key={col.key} className="px-5 py-3.5 text-gray-700">
                        {col.render ? col.render(item[col.key], item) : item[col.key] ?? '-'}
                      </td>
                    ))}
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-sm font-medium transition-all hover:bg-blue-50" style={{color: PADI.blue}} title="编辑">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => handleDelete(item)} className="p-2 rounded-lg text-sm font-medium transition-all hover:bg-red-50" style={{color: '#EF4444'}} title="删除">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b flex items-center justify-between" style={{borderColor: '#F0F0F0'}}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm" style={{background: PADI.blue}}>
                  {editItem ? '✎' : '+'}
                </div>
                <div>
                  <h2 className="text-base font-bold" style={{color: PADI.dark}}>{editItem ? '编辑记录' : '新增记录'}</h2>
                  <p className="text-xs" style={{color: PADI.gray}}>填写信息后保存</p>
                </div>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 gap-4">
                {fields.map(field => {
                  if (field.type === 'text') {
                    return (
                      <div key={field.key}>
                        <label className="block text-sm font-medium mb-1.5" style={{color: '#374151'}}>
                          {field.label}{field.required && <span className="text-red-500 ml-0.5">*</span>}
                        </label>
                        <input type="text" value={form[field.key] || ''} onChange={e => setField(field.key, e.target.value)} required={field.required}
                          placeholder={field.placeholder}
                          className="w-full px-3.5 py-2.5 border rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-offset-1"
                          style={{borderColor: '#E5E7EB', '--tw-ring-color': PADI.blue} as any}
                        />
                      </div>
                    );
                  }
                  if (field.type === 'number') {
                    return (
                      <div key={field.key}>
                        <label className="block text-sm font-medium mb-1.5" style={{color: '#374151'}}>{field.label}</label>
                        <input type="number" value={form[field.key] || ''} onChange={e => setField(field.key, Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 border rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-offset-1"
                          style={{borderColor: '#E5E7EB'} as any}
                        />
                      </div>
                    );
                  }
                  if (field.type === 'textarea') {
                    return (
                      <div key={field.key}>
                        <label className="block text-sm font-medium mb-1.5" style={{color: '#374151'}}>{field.label}</label>
                        <textarea value={form[field.key] || ''} onChange={e => setField(field.key, e.target.value)} rows={3}
                          className="w-full px-3.5 py-2.5 border rounded-xl text-sm resize-none outline-none transition-all focus:ring-2 focus:ring-offset-1"
                          style={{borderColor: '#E5E7EB'} as any}
                        />
                      </div>
                    );
                  }
                  if (field.type === 'checkbox') {
                    return (
                      <div key={field.key} className="flex items-center gap-3 py-1">
                        <input type="checkbox" id={field.key} checked={!!form[field.key]} onChange={e => setField(field.key, e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                          style={{accentColor: PADI.blue}}
                        />
                        <label htmlFor={field.key} className="text-sm cursor-pointer" style={{color: '#374151'}}>{field.label}</label>
                      </div>
                    );
                  }
                  if (field.type === 'select') {
                    const opts = dynamicOptions[field.key] || field.options || [];
                    return (
                      <div key={field.key}>
                        <label className="block text-sm font-medium mb-1.5" style={{color: '#374151'}}>{field.label}</label>
                        <select value={form[field.key] || ''} onChange={e => setField(field.key, e.target.value)}
                          className="w-full px-3.5 py-2.5 border rounded-xl text-sm bg-white outline-none transition-all focus:ring-2 focus:ring-offset-1"
                          style={{borderColor: '#E5E7EB'} as any}
                        >
                          <option value="">请选择</option>
                          {opts.map((opt: any) => (
                            <option key={opt.id || opt.value} value={String(opt.id || opt.value)}>
                              {opt.name_zh || opt.label || opt.name_en || String(opt)}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              <div className="flex items-center justify-end gap-3 pt-3 border-t" style={{borderColor: '#F0F0F0'}}>
                <button type="button" onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 text-sm font-medium rounded-xl border transition-all hover:bg-gray-50"
                  style={{borderColor: '#E5E7EB', color: '#6B7280'}}
                >取消</button>
                <button type="submit" disabled={saving}
                  className="px-6 py-2.5 text-sm font-semibold text-white rounded-xl shadow transition-all disabled:opacity-50 flex items-center gap-2"
                  style={{background: saving ? PADI.blueDark : PADI.blue}}
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      保存中...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      保存
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
