import { TDairyRadio } from "utils/data/type";

type TProps = {
    data: [] | any;
    onChange: any;
    defaultData: number;
    disabled: boolean;
}

export const DiaryRadio = ({
    data,
    onChange,
    defaultData,
    disabled
}: TProps) => {

    return(
        <div className="flex justify-start items-center flex-wrap">
            {data?.map((item: TDairyRadio) => (
                <label key={item.key} htmlFor={item.key} className="flxe text-center w-[45px] cursor-pointer mx-1">
                    <input
                        type="radio"
                        value={item.value}
                        id={item.key}
                        name={item.name}
                        className="hidden"
                        onChange={() => {onChange(item.value)}}
                        checked={defaultData === item.value }
                        disabled={disabled}
                    />
                    <span className="flex justify-center opacity-[.3]">{item.icon}</span>
                    <p className="text-[16px] text-[rgba(0,0,0,0.3)]">{item.key}</p>
                </label>
            ))}

            <style>
                {`
                    svg{
                        width: 25px;
                        height: 25px;
                    }
                    input:checked + span{
                        opacity: 1
                    }
                    input:checked + span + p{
                        color: #000;
                    }
                `}
            </style>
        </div>
    )
}