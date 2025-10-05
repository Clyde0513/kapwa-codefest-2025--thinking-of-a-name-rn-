'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Settings {
  leadershipTitle?: string;
  chaplainName?: string;
  northShoreCoordinator?: string;
  northShoreAssistantCoordinator?: string;
  northShoreSecretary?: string;
  northShoreFinanceTeam?: string;
  northShoreHeadOfLiturgy?: string;
  northShoreFaithFormation?: string;
  southShoreCoordinator?: string;
  southShoreAssistantCoordinator?: string;
  southShoreSecretary?: string;
  southShoreFinanceTeam?: string;
  southShoreHeadOfLiturgy?: string;
  southShoreFaithFormation?: string;
  financeTreasurers?: string;
  financeAuditor?: string;
}

export default function Leadership() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();
        if (response.ok) {
          setSettings(data.settings);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  // Fallback values
  const title = settings?.leadershipTitle || 'Leadership';
  const chaplain = settings?.chaplainName || 'Father Peru Dayag, SVD';
  const northShoreCoordinator = settings?.northShoreCoordinator || 'Annie Taliad';
  const northShoreAssistantCoordinator = settings?.northShoreAssistantCoordinator || 'Jeffrey Pagulong';
  const northShoreSecretary = settings?.northShoreSecretary || 'Meynard Gutierrez';
  const northShoreFinanceTeam = settings?.northShoreFinanceTeam || 'Crispina Gutierrez';
  const northShoreHeadOfLiturgy = settings?.northShoreHeadOfLiturgy || 'Kaye Vito';
  const northShoreFaithFormation = settings?.northShoreFaithFormation || 'Pearl Brault, Jun Cruz';
  const southShoreCoordinator = settings?.southShoreCoordinator || 'John Manuel';
  const southShoreAssistantCoordinator = settings?.southShoreAssistantCoordinator || 'Loreta Borneo';
  const southShoreSecretary = settings?.southShoreSecretary || 'Alpha Cattaneo';
  const southShoreFinanceTeam = settings?.southShoreFinanceTeam || 'Rudy Hermosa';
  const southShoreHeadOfLiturgy = settings?.southShoreHeadOfLiturgy || 'Ross Mangilog';
  const southShoreFaithFormation = settings?.southShoreFaithFormation || 'Lisa Paradela, Salome Afable';
  const financeTreasurers = settings?.financeTreasurers || 'Priscilla Cruz, Gracita Chiefe';
  const financeAuditor = settings?.financeAuditor || 'July Afable';
  return (
    <section id="leadership" className="py-20 px-4" style={{ backgroundColor: '#FFFDD0' }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-poppins font-bold text-gray-900 text-center mb-12">
          {title}
        </h2>
        
        <div className="max-w-6xl mx-auto">
          {/* Leadership Card with Background Image */}
          <div className="relative rounded-2xl shadow-2xl overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <Image
                src="/images/incense.png"
                alt="Incense background"
                fill
                className="object-cover"
                priority
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 text-white">
              {/* Header */}
              <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Filipino Apostolate
                </h3>
                <h4 className="text-2xl md:text-3xl font-bold mb-4">
                  of the Archdiocese of Boston
                </h4>
                <p className="text-xl md:text-2xl font-semibold">
                  North Shore and South Shore Communities
                </p>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
                {/* Left Column - Chaplain & Board of Advisors */}
                <div className="space-y-8">
                  {/* Chaplain */}
                  <div>
                    <h5 className="text-xl md:text-2xl font-bold mb-3 text-center lg:text-left">
                      CHAPLAIN
                    </h5>
                    <p className="text-base md:text-lg text-center lg:text-left">
                      {chaplain}
                    </p>
                  </div>

                  {/* Board of Advisors */}
                  <div>
                    <h5 className="text-xl md:text-2xl font-bold mb-3 text-center lg:text-left">
                      BOARD OF ADVISORS
                    </h5>
                    <p className="text-base md:text-lg mb-2 text-center lg:text-left">
                      (Former Chairpersons
                    </p>
                    <p className="text-base md:text-lg mb-4 text-center lg:text-left">
                      of the Apostolate)
                    </p>
                    <ul className="space-y-2 text-base md:text-lg text-center lg:text-left">
                      <li>Johnny Manuel</li>
                      <li>Jenny Aying</li>
                      <li>Meynard Gutierrez</li>
                      <li>Gracita Chiefe</li>
                      <li>Manuel Paradela</li>
                    </ul>
                  </div>
                </div>

                {/* Middle Column - North Shore Executive Council */}
                <div className="space-y-6">
                  <h5 className="text-xl md:text-2xl font-bold mb-4 text-center">
                    EXECUTIVE COUNCIL
                  </h5>
                  <p className="text-lg md:text-xl font-semibold mb-4 text-center">
                    North Shore Communities
                  </p>
                  
                  <div className="space-y-3 text-base md:text-lg">
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Coordinator</span>
                      <span className="text-right">{northShoreCoordinator}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Assistant Coordinator</span>
                      <span className="text-right">{northShoreAssistantCoordinator}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Secretary</span>
                      <span className="text-right">{northShoreSecretary}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Finance Team</span>
                      <span className="text-right">{northShoreFinanceTeam}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Head of Liturgy</span>
                      <span className="text-right">{northShoreHeadOfLiturgy}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Faith Formation Outreach</span>
                      <span className="text-right">
                        {northShoreFaithFormation.split(',').map((name, index) => (
                          <span key={index}>
                            {name.trim()}
                            {index < northShoreFaithFormation.split(',').length - 1 && <br />}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column - South Shore Executive Council */}
                <div className="space-y-6">
                  <h5 className="text-xl md:text-2xl font-bold mb-4 text-center">
                    EXECUTIVE COUNCIL
                  </h5>
                  <p className="text-lg md:text-xl font-semibold mb-4 text-center">
                    South Shore Communities
                  </p>
                  
                  <div className="space-y-3 text-base md:text-lg">
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Coordinator</span>
                      <span className="text-right">{southShoreCoordinator}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Assistant Coordinator</span>
                      <span className="text-right">{southShoreAssistantCoordinator}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Secretary</span>
                      <span className="text-right">{southShoreSecretary}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Finance Team</span>
                      <span className="text-right">{southShoreFinanceTeam}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Head of Liturgy</span>
                      <span className="text-right">{southShoreHeadOfLiturgy}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">Faith Formation Outreach</span>
                      <span className="text-right">
                        {southShoreFaithFormation.split(',').map((name, index) => (
                          <span key={index}>
                            {name.trim()}
                            {index < southShoreFaithFormation.split(',').length - 1 && <br />}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Finance Committee Section */}
              <div className="mt-10 pt-8 border-t border-white/30">
                <h5 className="text-xl md:text-2xl font-bold mb-6 text-center">
                  Finance Committee
                </h5>
                
                <div className="max-w-2xl mx-auto space-y-3 text-base md:text-lg">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold">Treasurers</span>
                    <span className="text-right">
                      {financeTreasurers.split(',').map((name, index) => (
                        <span key={index}>
                          {name.trim()}
                          {index < financeTreasurers.split(',').length - 1 && <br />}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="font-semibold">Auditor</span>
                    <span className="text-right">{financeAuditor}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
