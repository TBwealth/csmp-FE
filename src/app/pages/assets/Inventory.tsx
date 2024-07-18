
type Props = {
  data: any[];
  mode: string;
};

const Inventory = ({ data, mode }: Props) => {
  return (
    <div className="w-full grid md:grid-cols-4 gap-[23px] mt-[24px]">
      {data.map((d) => (
        <div
          className={`${
            mode === "dark" ? "bg-lightDark" : "bg-[#FFF]"
          } rounded-[12px] px-[24px] py-[16px] border`}
        >
          <div className="flex items-center justify-between pb-[12px] border-bottom">
            <h1 className="font-semibold text-[14px]">{d.services}</h1>
          </div>
          <div className="flex items-center justify-between pt-[12px]">
            <p className="font-bold text-[14px]">
              {d.count} <span className="font-medium">{d.count > 1 ? "Instances" : "Instance"}</span>
            </p>
            <button className="font-medium underline">view all</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Inventory;
