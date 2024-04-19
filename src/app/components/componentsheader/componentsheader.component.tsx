export interface IRequiredButton {
  name: string;
  label: string;
  outline: boolean;
  icon: string;
}

type PropTypes = {
  buttonClick: React.Dispatch<string>;
  backbuttonClick: React.Dispatch<string>;
  showbackbutton?: boolean;
  pageName: string;
  requiredButton?: IRequiredButton[];
};

export const ComponentsheaderComponent = ({
  showbackbutton = false,
  pageName,
  requiredButton = [],
  buttonClick,
  backbuttonClick,
}: PropTypes) => {
  return (
    <>
      <div className="flex flex-row pt-4 justify-between">
        <div className="flex flex-col gap-2 mx-6">
        <div className="flex items-center pl-5 pt-2 -mb-2">
            <h1 className="font-bold mb-2 md:mb-0  text-2xl">{pageName}</h1>
          </div>
          {showbackbutton && (
            <button
            type="button"
              onClick={() => backbuttonClick("back")}
              // className="border trigger border-solid hover:border-dotted border-gray-400
              //        md:w-58 shadow-md rounded  md:px-6 py-1 px-3 text-sm text-center flex items-center justify-center capitalize"
              className="  trigger border-solid hover:border-dotted border-gray-400
                     md:w-58  rounded-full     md:px-6  px-3 -mb-9 pt-6 text-sm text-center flex items-center capitalize"
             >
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5   border  border-black border-spacing-2 rounded-full "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <span className="ml-3">back</span>
            </button>
          )}

         
        </div>

        <div className="flex md:space-x-6 space-x-2 mr-6">
          {requiredButton.map((val: IRequiredButton) => (
            <div>
              {val.outline && (
                <button
                  type="button"
                  onClick={() => buttonClick(val.name)}
                  className="border trigger border-solid hover:border-dotted border-purple-900 text-primary
                         md:w-50 shadow-md rounded-[5px] bg-white md:px-8  py-3 px-5 text-sm text-center capitalize "
                >
                  {val.label}
                </button>
              )}
              {!val.outline && (
                <button
                  type="button"
                  onClick={() => buttonClick(val.name)}
                  className="bg-primary md:w-50 text-sm shadow-md  rounded-[5px] md:px-8 py-3 px-5 text-white text-center capitalize"
                >
                  {val.label}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
