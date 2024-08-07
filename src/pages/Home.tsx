import { HomeCalendar } from "components/home/HomeCalendar";
import { Diary } from "components/home/Diary";
import { Point } from "components/home/Point";
import { useSelector, useDispatch } from "react-redux";
import { StateType, DateState, UserState } from "store/types";
import { useEffect, useState } from "react";
import { getPoint } from "hooks/hooks";

export const Home = () => {

    const clickDateText = useSelector((state: StateType) => state.dateStore.clickDateText);
    const clickDate = useSelector((state: StateType) => state.dateStore.clickDate);
    const [point, setPoint] = useState<string>("");
    const [isPossible, setIsPossible] = useState<boolean>(false);
    const [isReload, setIsReload] = useState<boolean>(false);
    const clickDateForm = new Date(clickDate)
    const newClickDateForm = new Date(clickDateForm.getFullYear(), clickDateForm.getMonth(), clickDateForm.getDate());

    const currentDate = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(currentDate.getDate() - 8);

    // 포인트 조회
    const handlePoint = async () => {
        const usePoint = await getPoint();
        setPoint(usePoint);
    }

    useEffect(() => {
        handlePoint();
    }, []);

    useEffect(() => {
        if(newClickDateForm >= oneWeekAgo && newClickDateForm <= currentDate){
            setIsPossible(true);
        }else{
            setIsPossible(false);
        }
    }, [clickDate]);

    return(
        <div className="w-full flex justify-between">
            <Diary
                textDate={clickDateText}
                clickDate={clickDate}
                handlePoint={handlePoint}
                isPossible={isPossible}
                setIsReload={setIsReload}
            />
            <div className="w-[45%]">
                <Point point={point} />
                <HomeCalendar
                    isReload={isReload}
                />
            </div>
        </div>
    )
}