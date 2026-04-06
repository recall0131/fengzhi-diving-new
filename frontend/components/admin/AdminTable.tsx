'use client';

import { useEffect, useState, useCallback } from 'react';

const PADI = {
  blue: '#0098B3',
  blueDark: '#007591',
  blueLight: '#E8F4F7',
  yellow: '#FFB600',
  orange: '#FF6B00',
  dark: '#0F1923',
  gray: '#64748B',
  grayLight: '#94A3B8',
  border: '#E2E8F0',
  bg: '#F1F5F9',
  surface: '#FFFFFF',
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
        <div className="fixed top-5 right-5 z-50 px-5 py-3 rounded-xl text-sm font-medium text-white shadow-xl flex items-center gap-2.5"
          style={{background: '#1E293B', fontFamily: "'Inter', sans-serif"}}>
          <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {toast}
        </div>
      )}

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-xl font-bold" style={{color: '#0F172A'}}>{title}</h1>
            <p className="text-sm mt-0.5" style={{color: PADI.gray}}>
              {loading ? '加载中...' : `共 ${items.length} 条记录`}
            </p>
          </div>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md active:scale-95"
          style={{background: PADI.blue, fontFamily: "'Inter', sans-serif"}}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          新增
        </button>
      </div>

      {/* Table card */}
      <div className="rounded-xl border overflow-hidden" style={{borderColor: PADI.border, background: PADI.surface, fontFamily: "'Inter', sans-serif"}}>
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-3 border-t-transparent rounded-full animate-spin" style={{borderColor: `${PADI.blue} transparent transparent transparent`}} />
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{background: PADI.bg}}>
              <svg className="w-8 h-8" style={{color: PADI.grayLight}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-sm font-medium" style={{color: PADI.gray}}>暂无数据</p>
            <p className="text-xs mt-1" style={{color: PADI.grayLight}}>点击右上角「新增」添加第一条记录</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{background: '#F8FAFC'}}>
                  {columns.map(col => (
                    <th key={col.key} className="text-left text-xs font-semibold uppercase tracking-wider px-5 py-3" style={{color: PADI.gray}}>{col.label}</th>
                  ))}
                  <th className="text-right text-xs font-semibold uppercase tracking-wider px-5 py-3" style={{color: PADI.gray}}>操作</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={item.id} className="border-t transition-colors" style={{borderColor: PADI.border}}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#FAFAFA'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ''}
                  >
                    {columns.map(col => (
                      <td key={col.key} className="px-5 py-3.5 text-sm" style={{color: '#334155'}}>
                        {col.render ? col.render(item[col.key], item) : item[col.key] ?? '-'}
                      </td>
                    ))}
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(item)}
                          className="p-1.5 rounded-lg transition-colors text-sm font-medium"
                          title="编辑"
                          style={{color: PADI.blue}}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = PADI.blueLight}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ''}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => handleDelete(item)}
                          className="p-1.5 rounded-lg transition-colors text-sm font-medium"
                          title="删除"
                          style={{color: '#EF4444'}}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#FEF2F2'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ''}
                        >
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" style={{fontFamily: "'Inter', sans-serif"}}>
            {/* Modal header */}
            <div className="px-6 py-4 border-b flex items-center justify-between" style={{borderColor: PADI.border}}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{background: PADI.blue}}>
                  {editItem ? '✎' : '+'}
                </div>
                <div>
                  <h3 className="text-sm font-bold" style={{color: '#0F172A'}}>{editItem ? '编辑记录' : '新增记录'}</h3>
                  <p className="text-xs" style={{color: PADI.gray}}>填写信息后保存</p>
                </div>
              </div>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg transition-colors hover:bg-gray-100">
                <svg className="w-5 h-5" style={{color: PADI.gray}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              )}

              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                {fields.map(field => {
                  if (field.type === 'text') {
                    return (
                      <div key={field.key}>
                        <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{color: '#475569'}}>
                          {field.label}{field.required && <span className="text-red-500 ml-0.5">*</span>}
                        </label>
                        <input type="text" value={form[field.key] || ''} onChange={e => setField(field.key, e.target.value)} required={field.required}
                          placeholder={field.placeholder}
                          className="w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all outline-none"
                          style={{borderColor: PADI.border, color: '#1E293B', fontFamily: "'Inter', sans-serif"}}
                          onFocus={e => { e.target.style.borderColor = PADI.blue; e.target.style.boxShadow = `0 0 0 3px ${PADI.blueLight}`; }}
                          onBlur={e => { e.target.style.borderColor = PADI.border; e.target.style.boxShadow = 'none'; }}
                        />
                      </div>
                    );
                  }
                  if (field.type === 'number') {
                    return (
                      <div key={field.key}>
                        <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{color: '#475569'}}>{field.label}</label>
                        <input type="number" value={form[field.key] || ''} onChange={e => setField(field.key, Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all outline-none"
                          style={{borderColor: PADI.border, color: '#1E293B', fontFamily: "'Inter', sans-serif"}}
                          onFocus={e => { e.target.style.borderColor = PADI.blue; e.target.style.boxShadow = `0 0 0 3px ${PADI.blueLight}`; }}
                          onBlur={e => { e.target.style.borderColor = PADI.border; e.target.style.boxShadow = 'none'; }}
                        />
                      </div>
                    );
                  }
                  if (field.type === 'textarea') {
                    return (
                      <div key={field.key}>
                        <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{color: '#475569'}}>{field.label}</label>
                        <textarea value={form[field.key] || ''} onChange={e => setField(field.key, e.target.value)} rows={3}
                          className="w-full px-3.5 py-2.5 rounded-lg border text-sm resize-none transition-all outline-none"
                          style={{borderColor: PADI.border, color: '#1E293B', fontFamily: "'Inter', sans-serif"}}
                          onFocus={e => { e.target.style.borderColor = PADI.blue; e.target.style.boxShadow = `0 0 0 3px ${PADI.blueLight}`; }}
                          onBlur={e => { e.target.style.borderColor = PADI.border; e.target.style.boxShadow = 'none'; }}
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
                        <label htmlFor={field.key} className="text-sm cursor-pointer" style={{color: '#475569'}}>{field.label}</label>
                      </div>
                    );
                  }
                  if (field.type === 'select') {
                    const opts = dynamicOptions[field.key] || field.options || [];
                    return (
                      <div key={field.key}>
                        <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{color: '#475569'}}>{field.label}</label>
                        <select value={form[field.key] || ''} onChange={e => setField(field.key, e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white transition-all outline-none"
                          style={{borderColor: PADI.border, color: '#1E293B', fontFamily: "'Inter', sans-serif"}}
                          onFocus={e => { e.target.style.borderColor = PADI.blue; e.target.style.boxShadow = `0 0 0 3px ${PADI.blueLight}`; }}
                          onBlur={e => { e.target.style.borderColor = PADI.border; e.target.style.boxShadow = 'none'; }}
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

              <div className="flex items-center justify-end gap-3 pt-3 border-t" style={{borderColor: PADI.border}}>
                <button type="button" onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors"
                  style={{borderColor: PADI.border, color: PADI.gray}}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#F8FAFC'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ''}
                >取消</button>
                <button type="submit" disabled={saving}
                  className="px-5 py-2 text-sm font-semibold text-white rounded-lg flex items-center gap-2 transition-all disabled:opacity-60"
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
