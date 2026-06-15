'use client';

import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import type { AdminContent } from '@/lib/admin';
import { getContents, updateContent } from '@/lib/admin';

type SectionGroup = {
  section: string;
  items: AdminContent[];
};

export default function ContenidoPage() {
  const [groups, setGroups] = useState<SectionGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});

  useEffect(() => {
    getContents().then((data) => {
      const grouped: SectionGroup[] = [];
      const map = new Map<string, AdminContent[]>();
      data.forEach((item) => {
        if (!map.has(item.section)) map.set(item.section, []);
        map.get(item.section)!.push(item);
      });
      map.forEach((items, section) => {
        grouped.push({ section, items });
      });
      setGroups(grouped);

      const initial: Record<string, string> = {};
      data.forEach((item) => {
        initial[item.id] = item.value;
      });
      setEditing(initial);
      setLoading(false);
    });
  }, []);

  async function handleSave(content: AdminContent) {
    setSaving((prev) => ({ ...prev, [content.id]: true }));
    await updateContent(content.id, editing[content.id] ?? content.value);
    setSaving((prev) => ({ ...prev, [content.id]: false }));
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-light rounded" />
          <div className="h-64 bg-gray-light rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl">
      <div>
        <h1 className="text-h2 text-primary">Contenido del sitio</h1>
        <p className="text-sm text-gray-dark mt-1">
          Edita los textos mostrados en las distintas secciones de la tienda
        </p>
      </div>

      <div className="mt-6 space-y-6">
        {groups.map((group) => (
          <div
            key={group.section}
            className="bg-white rounded-lg border border-gray-light overflow-hidden"
          >
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-light">
              <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
                {group.section}
              </h2>
            </div>
            <div className="p-5 space-y-4">
              {group.items.map((item) => (
                <div key={item.id}>
                  <label className="block text-sm font-medium text-primary mb-1.5">
                    {item.label}
                    <span className="text-xs text-gray-dark ml-2 font-mono">({item.key})</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editing[item.id] ?? ''}
                      onChange={(e) =>
                        setEditing((prev) => ({ ...prev, [item.id]: e.target.value }))
                      }
                      className="flex-1 px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                    />
                    <button
                      onClick={() => handleSave(item)}
                      disabled={saving[item.id]}
                      className="flex items-center gap-1.5 px-3 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 shrink-0"
                    >
                      <Save className="w-3.5 h-3.5" />
                      {saving[item.id] ? '...' : 'Guardar'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
