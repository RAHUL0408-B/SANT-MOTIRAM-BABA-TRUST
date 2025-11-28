import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, TrendingUp, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase, Member, Program } from '../lib/supabase';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [members, setMembers] = useState<Member[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [membersRes, programsRes] = await Promise.all([
        supabase.from('members').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('programs').select('*').order('date', { ascending: false }).limit(3),
      ]);

      if (membersRes.data) setMembers(membersRes.data);
      if (programsRes.data) setPrograms(programsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {t('dashboard.welcome')}, {user?.full_name}
        </h1>
        <p className="text-gray-600">{t('dashboard.overview')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-12 h-12 opacity-80" />
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="text-3xl font-bold mb-1">{members.length}+</div>
          <div className="text-orange-100">{t('member.membersList')}</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-12 h-12 opacity-80" />
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="text-3xl font-bold mb-1">{programs.length}+</div>
          <div className="text-blue-100">{t('program.programsList')}</div>
        </div>

        <Link
          to="/members/new"
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
        >
          <div className="flex items-center justify-between mb-4">
            <Plus className="w-12 h-12" />
          </div>
          <div className="text-xl font-bold">{t('nav.addMember')}</div>
          <div className="text-green-100 text-sm">{t('member.addMember')}</div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-orange-600" />
            {t('dashboard.recentMembers')}
          </h2>
          <div className="space-y-3">
            {members.length === 0 ? (
              <p className="text-gray-500 text-sm">{t('member.addMember')}</p>
            ) : (
              members.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <div className="font-medium text-gray-800">{member.full_name}</div>
                    <div className="text-sm text-gray-600">
                      {member.village}, {member.taluka}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(member.joining_date).toLocaleDateString('mr-IN')}
                  </div>
                </div>
              ))
            )}
          </div>
          <Link
            to="/members"
            className="mt-4 block text-center text-orange-600 font-medium hover:text-orange-700 text-sm"
          >
            {t('member.membersList')} →
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            {t('dashboard.upcomingPrograms')}
          </h2>
          <div className="space-y-3">
            {programs.length === 0 ? (
              <p className="text-gray-500 text-sm">{t('program.addProgram')}</p>
            ) : (
              programs.map((program) => (
                <div key={program.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-gray-800">{program.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{program.location}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(program.date).toLocaleDateString('mr-IN')}
                  </div>
                </div>
              ))
            )}
          </div>
          <Link
            to="/programs"
            className="mt-4 block text-center text-blue-600 font-medium hover:text-blue-700 text-sm"
          >
            {t('program.programsList')} →
          </Link>
        </div>
      </div>
    </div>
  );
};
