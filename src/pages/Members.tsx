import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Download, Trash2, Edit } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase, Member } from '../lib/supabase';

export const Members: React.FC = () => {
  const { t } = useLanguage();
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [talukaFilter, setTalukaFilter] = useState('');
  const [villageFilter, setVillageFilter] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    filterMembers();
  }, [members, searchTerm, districtFilter, talukaFilter, villageFilter]);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMembers = () => {
    let filtered = [...members];

    if (searchTerm) {
      filtered = filtered.filter(
        (m) =>
          m.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
<<<<<<< HEAD
          m.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (m.post && m.post.toLowerCase().includes(searchTerm.toLowerCase()))
=======
          m.village.toLowerCase().includes(searchTerm.toLowerCase())
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
      );
    }

    if (districtFilter) {
      filtered = filtered.filter((m) => m.district === districtFilter);
    }

    if (talukaFilter) {
      filtered = filtered.filter((m) => m.taluka === talukaFilter);
    }

    if (villageFilter) {
      filtered = filtered.filter((m) => m.village === villageFilter);
    }

    setFilteredMembers(filtered);
  };

  const handleDelete = async (id: string) => {
<<<<<<< HEAD
    if (!window.confirm('Are you sure you want to delete this member?')) return;

    try {
      const { error } = await supabase.from('members').delete().eq('id', id);
      if (error) {
        throw error;
      }
      // Refresh the list after successful deletion
      await fetchMembers();
      alert(t('member.deletedSuccessfully'));
    } catch (error) {
      console.error('Error deleting member:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert('Failed to delete member: ' + errorMessage);
    }
  };

  const downloadCSV = () => {
    const headers = [
      'Joining Date / रुजू दिनांक',
      'Full Name / पूर्ण नाव',
      'Village / गाव',
      'Post / पोस्ट',
      'Taluka / तालुका',
      'District / जिल्हा',
      'State / राज्य',
      'Pincode / पिनकोड',
      'Mobile / मोबाईल',
      'Notes / टीप',
    ];

    const csvContent = [
      headers.join(','),
      ...filteredMembers.map((m) =>
        [
          m.joining_date,
          `"${m.full_name}"`, // Quote full name to handle commas
          m.village,
          m.post || '',
          m.taluka || '',
          m.district || '',
          m.state || '',
          m.pincode || '',
          m.mobile || '',
          `"${(m.notes || '').replace(/"/g, '""')}"`, // Escape quotes in notes
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
=======
    if (!confirm('Are you sure you want to delete this member?')) return;

    try {
      const { error } = await supabase.from('members').delete().eq('id', id);
      if (error) throw error;
      fetchMembers();
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  // ✅ UPDATED CSV EXPORT FUNCTION – UTF-8 + BOM (fix Marathi/Hindi)
  const downloadCSV = () => {
    const headers = [
      'Joining Date',
      'Full Name',
      'Village',
      'Post',
      'Taluka',
      'District',
      'State',
      'Pincode',
      'Notes',
    ];

    const csvContent =
      '\uFEFF' + // 👈 BOM add kiya – ye line sabse important hai
      [
        headers.join(','),
        ...filteredMembers.map((m) =>
          [
            m.joining_date,
            m.full_name,
            m.village,
            m.post || '',
            m.taluka || '',
            m.district || '',
            m.state || '',
            m.pincode || '',
            (m.notes || '').replace(/,/g, ';'),
          ].join(',')
        ),
      ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `members_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const districts = [...new Set(members.map((m) => m.district).filter(Boolean))];
  const talukas = [...new Set(members.map((m) => m.taluka).filter(Boolean))];
  const villages = [...new Set(members.map((m) => m.village).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
<<<<<<< HEAD
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{t('member.membersList')}</h1>
=======
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {t('member.membersList')}
          </h1>
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
          <p className="text-gray-600 mt-1">
            {t('member.totalMembers')}: {filteredMembers.length}
          </p>
        </div>
        <Link
          to="/members/new"
<<<<<<< HEAD
          className="flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-all shadow-lg hover:shadow-orange-500/30"
=======
          className="flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors shadow-md"
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
        >
          <Plus className="w-5 h-5" />
          <span>{t('member.addMember')}</span>
        </Link>
      </div>

<<<<<<< HEAD
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
=======
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('common.search')}
            </label>
<<<<<<< HEAD
            <div className="relative group">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
=======
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`${t('member.fullName')}, ${t('member.village')}...`}
<<<<<<< HEAD
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
=======
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('member.district')}
            </label>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
<<<<<<< HEAD
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
=======
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
            >
              <option value="">{t('common.filter')}</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('member.taluka')}
            </label>
            <select
              value={talukaFilter}
              onChange={(e) => setTalukaFilter(e.target.value)}
<<<<<<< HEAD
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
=======
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
            >
              <option value="">{t('common.filter')}</option>
              {talukas.map((ta) => (
                <option key={ta} value={ta}>
                  {ta}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('member.village')}
            </label>
            <select
              value={villageFilter}
              onChange={(e) => setVillageFilter(e.target.value)}
<<<<<<< HEAD
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
=======
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
            >
              <option value="">{t('common.filter')}</option>
              {villages.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>

<<<<<<< HEAD
        <div className="mt-6 flex justify-end">
          <button
            onClick={downloadCSV}
            className="flex items-center space-x-2 bg-green-600 text-white px-5 py-2.5 rounded-xl hover:bg-green-700 transition-all shadow-md hover:shadow-green-500/30"
=======
        <div className="mt-4">
          <button
            onClick={downloadCSV}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
          >
            <Download className="w-4 h-4" />
            <span>{t('member.downloadCSV')}</span>
          </button>
        </div>
      </div>

<<<<<<< HEAD
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {t('member.joiningDate')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {t('member.fullName')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {t('member.village')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {t('member.taluka')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {t('member.district')}
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
=======
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('member.joiningDate')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('member.fullName')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('member.village')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('member.taluka')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('member.district')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
                  {t('common.edit')}
                </th>
              </tr>
            </thead>
<<<<<<< HEAD
            <tbody className="divide-y divide-gray-100">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-orange-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(member.joining_date).toLocaleDateString('mr-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:text-orange-700 transition-colors">
=======
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(member.joining_date).toLocaleDateString('mr-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
                    {member.full_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {member.village}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {member.taluka}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {member.district}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
<<<<<<< HEAD
                    <div className="flex items-center justify-end space-x-3">
                      <Link
                        to={`/members/edit/${member.id}`}
                        className="text-gray-400 hover:text-orange-600 transition-colors p-1 hover:bg-orange-100 rounded-lg"
=======
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        to={`/members/edit/${member.id}`}
                        className="text-orange-600 hover:text-orange-900"
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(member.id)}
<<<<<<< HEAD
                        className="text-gray-400 hover:text-red-600 transition-colors p-1 hover:bg-red-100 rounded-lg"
=======
                        className="text-red-600 hover:text-red-900"
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMembers.length === 0 && (
<<<<<<< HEAD
          <div className="text-center py-16">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No members found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
=======
          <div className="text-center py-12 text-gray-500">
            {t('member.addMember')}
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
          </div>
        )}
      </div>
    </div>
  );
};
