import Divider from '@common/Divider';
import CheckList from '@common/CheckList';

interface DreamerCardProps {
  regionName: string;
  job: string;
  nickname: string;
  day: string;
  todo: string;
  profile: string;
  todotext: string[];
  doneList: boolean[];
}

const DreamerCard = ({
  regionName,
  job,
  nickname,
  day,
  todo,
  profile,
  todotext,
  doneList,
}: DreamerCardProps) => {
  return (
    <div className="hover:shadow-shadow2 flex h-auto w-[384px] flex-col items-start rounded-[30px] border-[1.2px] border-gray-300 bg-white p-[30px] transition-shadow">
      <div className="flex flex-row gap-5">
        <img
          src={profile}
          alt="프로필이미지"
          className="h-[90px] w-[90px] rounded-full"
        />

        <div className="flex flex-col gap-[6px]">
          <span className="text-gray-900 font-T05-SB">{nickname}</span>
          <span className="text-gray-500 font-C01-M">{day}일째 꿈꾸는 중</span>

          <div className="mt-1 flex items-center justify-center gap-[10px]">
            <div className="rounded-[10px] bg-purple-100 p-2 text-purple-500 font-B03-SB">
              {job}
            </div>

            <div className="rounded-[10px] bg-gray-100 p-2 text-gray-500 font-B03-SB">
              할일 {todo}개
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 mt-6 flex flex-row items-center justify-center gap-[10px]">
        <span className="text-gray-500 font-B02-M">지역</span>
        {regionName ? (
          <span className="text-gray-800 font-B02-SB">{regionName}</span>
        ) : (
          <span className="text-gray-500 font-B02-SB">
            등록된 지역이 없어요
          </span>
        )}
      </div>

      <Divider />

      <div className="mt-6 flex w-full flex-col gap-3">
        {!todotext || todotext.length === 0 ? (
          <span className="text-gray-500 font-B02-M">
            작성된 할일 목록이 없어요
          </span>
        ) : (
          <CheckList
            lists={todotext}
            defaultCheckedList={doneList}
            className="flex flex-col gap-3"
          />
        )}
      </div>
    </div>
  );
};

export default DreamerCard;
