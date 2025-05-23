import { useMemo, useState, useRef } from 'react';
import DropDown from '@common/DropDown';
import DateInput from '@common/DateInput';
import ResetButton from '@common/ResetButton';
import {
  jobOptions,
  districtMap,
  cityOptions,
} from '@utils/data/job/filterOptions.ts';
import { useFilterStore } from '@store/filterStore';

type Tag = { label: string; type: 'job' | 'location' | 'date' };

const Filter = () => {
  const {
    job,
    location,
    startDate,
    endDate,
    setSelection,
    updateDate,
    removeTag,
    reset,
  } = useFilterStore();

  const [locStep, setLocStep] = useState<'city' | 'district'>('city');
  const [tempCity, setTempCity] = useState('');
  const endDateRef = useRef<HTMLInputElement>(null);

  const selectedCity = location.split(' ')[0] || '';
  const selectedDistrict = location.split(' ')[1] || '';

  const tags = useMemo<Tag[]>(() => {
    const t: Tag[] = [];
    if (job) t.push({ label: job, type: 'job' });
    if (location.includes(' ')) t.push({ label: location, type: 'location' });
    if (startDate && endDate)
      t.push({ label: `${startDate} ~ ${endDate}`, type: 'date' });
    return t;
  }, [job, location, startDate, endDate]);

  const handleCitySelect = (city: string) => {
    setTempCity(city);
    if (city === selectedCity) {
      setLocStep('district');
    } else {
      setSelection('location', '');
      setLocStep('district');
    }
  };
  const handleDistrictSelect = (dist: string) => {
    setSelection('location', `${tempCity} ${dist}`);
    setLocStep('city');
  };
  const handleResetAll = () => {
    reset();
    setLocStep('city');
    setTempCity('');
  };

  return (
    <div className="w-full rounded-[30px] bg-white p-6 shadow-lg">
      <div className="mb-4 flex justify-end">
        <ResetButton onClick={handleResetAll} />
      </div>

      <div className="mt-2 flex flex-col gap-4 md:flex-row">
        <div className="basis-1/4">
          <DropDown
            title={'직업'}
            placeholder="직업 선택"
            options={jobOptions}
            value={job}
            onSelect={(v) => setSelection('job', v)}
          />
        </div>

        <div className="basis-1/4">
          <DropDown
            title="지역"
            placeholder={'지역 선택'}
            options={
              locStep === 'city' ? cityOptions : (districtMap[tempCity] ?? [])
            }
            value={locStep === 'city' ? selectedCity : selectedDistrict}
            onSelect={(v) => {
              if (locStep === 'city') handleCitySelect(v);
              else handleDistrictSelect(v);
            }}
            backButton={
              locStep === 'district'
                ? {
                    label: `${tempCity}`,
                    onClick: () => setLocStep('city'),
                  }
                : undefined
            }
            keepOpenOnSelect={locStep === 'city'}
          />
        </div>
        <div className="flex flex-1 items-end justify-center gap-2">
          <div className="basis-[43%]">
            <DateInput
              title={'공고 날짜'}
              label="공고 시작일"
              name="startDate"
              value={startDate}
              onChange={(v) => updateDate('startDate', v)}
              autoFocusTo={endDateRef}
            />
          </div>
          <span className="my-6 text-gray-400 font-B01-M">~</span>
          <div className="shrink-0 basis-[43%]">
            <div className="h-6" />
            <DateInput
              ref={endDateRef}
              label="공고 마감일"
              name="endDate"
              value={endDate}
              onChange={(v) => updateDate('endDate', v)}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag.label}
            className="flex items-center gap-1 rounded-full border border-purple-300 bg-purple-100 px-3 py-1 text-sm text-purple-500"
          >
            {tag.label}
            <button onClick={() => removeTag(tag.type)} className="text-xs">
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};
export default Filter;
