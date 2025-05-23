import { HomeBackImage, HomeCard } from './HomeImage';
import MyDreamArrow from '@assets/icons/myDreamarrow.svg?react';
import Arrow from '@assets/icons/arrow.svg?react';
import { useState } from 'react';
import ReadyTab from './tab/ReadyTab';
import StartTab from './tab/StartTab';
import ChallengeTab from './tab/ChallengeTab';
import Bell from '@assets/images/bell.webp';
import { useBannerQuery } from '@hook/useHomeQuery';
import { useUserStore } from '@store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { useFilterStore } from '@store/filterStore';

const LoginBanner = () => {
  const [activeTab, setActiveTab] = useState('준비하기');
  const tabs = ['준비하기', '시작하기', '도전하기'];
  const { data: jobList } = useBannerQuery();
  const regionName = useUserStore((state) => state.regionName);
  const navigate = useNavigate();
  const setSelection = useFilterStore((state) => state.setSelection);

  const renderTabContent = () => {
    switch (activeTab) {
      case '준비하기':
        return <ReadyTab />;
      case '시작하기':
        return <StartTab />;
      case '도전하기':
        return <ChallengeTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-row gap-6">
      <div className="relative w-full">
        <div className="z-0">
          <HomeBackImage />
        </div>

        <div className="absolute left-[122px] top-[100px] z-50">
          <div className="relative flex flex-row gap-6">
            <div className="relative">
              <HomeCard />

              <div className="absolute right-6 top-[14.5px] z-50 flex cursor-pointer items-center space-x-3">
                <span className="text-gray-500 font-B02-SB">마이드림 가기</span>
                <MyDreamArrow />
              </div>

              <div className="absolute left-[29px] top-[40px] flex flex-col">
                <span className="text-white font-B02-M">58일째 꿈꾸는 중</span>

                <div className="mt-[10px] text-xl text-white font-T01-B">
                  요양보호사 시작하는 중
                </div>
              </div>

              <div className="absolute bottom-2 left-[7.4px] flex h-[258px] w-[772.4px] rounded-b-[30px] bg-white stroke-gray-300 stroke-2">
                <div className="absolute -top-[33px] left-[30px] flex items-center justify-center border-b-[3px] border-white">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex h-[38px] w-[97px] cursor-pointer flex-col justify-center gap-[2px] rounded-tl-lg rounded-tr-lg px-[10px] py-[6px] transition-all duration-200 ${
                        activeTab === tab
                          ? 'bg-white text-purple-500 font-B02-SB'
                          : 'text-white font-B02-M'
                      } `}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="ml-[20px] mt-[30px]">{renderTabContent()}</div>
              </div>
            </div>

            <div className="flex h-[465px] w-[384px] flex-col items-start rounded-[30px] border border-gray-300 bg-white px-[30px] py-[40px]">
              <div className="flex w-full flex-row items-start justify-between">
                <img src={Bell} alt="Bell" className="h-[76px] w-[76px]" />
                <div
                  className="flex cursor-pointer flex-row items-center"
                  onClick={() => {
                    setSelection('location', regionName);
                    navigate('/jobsearch');
                  }}
                >
                  <div className="text-gray-500 font-B02-SB"> 더보기 </div>
                  <Arrow />
                </div>
              </div>

              <span className="mt-6 text-gray-900 font-T01-B">
                {' '}
                {regionName} 구인 현황
              </span>

              <div className="mt-[27px] flex flex-col items-center justify-center">
                <div className="flex flex-col gap-4">
                  {jobList &&
                    jobList.map((job) => (
                      <div
                        key={job['job-name']}
                        className="flex flex-row items-center gap-4"
                      >
                        <div className="flex items-center justify-center rounded-[10px] bg-purple-100 p-2 text-purple-500 font-T05-SB">
                          {job['job-name']}
                        </div>
                        <div className="text-gray-900 font-T05-SB">
                          {job.count}건
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBanner;
