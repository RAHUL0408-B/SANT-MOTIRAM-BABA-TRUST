import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Temple: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Hero Section with Background Image */}
        <div
          className="relative h-96 flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: "url('/src/assets/bhu.png')", // or "url('/bhu.png')" if inside public/
          }}
        >
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Text Content */}
          <div className="relative text-center text-white z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('temple.title')}
            </h1>
            <p className="text-xl text-orange-100">
              {t('temple.locationText')}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12">
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {t('temple.description')}
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {t('temple.history')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('temple.historyText')}
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-blue-600" />
                  {t('temple.visitInfo')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('temple.visitText')}
                </p>
              </div>
            </div>

            {/* Location Info */}
            <div className="bg-gray-50 rounded-xl p-8 my-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-green-600" />
                {t('temple.locationInfo')}
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <span className="font-semibold w-32">{t('temple.village')}:</span>
                  <span>{t('temple.villageName')}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-semibold w-32">{t('temple.taluka')}:</span>
                  <span>{t('temple.talukaName')}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-semibold w-32">{t('temple.district')}:</span>
                  <span>{t('temple.districtName')}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-semibold w-32">{t('temple.state')}:</span>
                  <span>{t('temple.stateName')}</span>
                </div>
              </div>
            </div>

            {/* Special Events Section */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 text-white my-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Calendar className="w-6 h-6 mr-3" />
                {t('temple.specialEvents')}
              </h2>

              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>{t('temple.event1')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>{t('temple.event2')}</span>
                </div>
               
              </div>
            </div>

            {/* Footer Section */}
            <div className="text-center mt-12 p-8 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl">
              <p className="text-xl font-semibold text-gray-800 mb-2">
                {t('temple.footerText1')}
              </p>
              <p className="text-gray-700">{t('temple.footerText2')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
