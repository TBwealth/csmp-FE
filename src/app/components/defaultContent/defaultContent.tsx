import "./default-content.component.css";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../atoms/modeAtoms.atom";

type Props = {
  buttonClick: React.Dispatch<any>;
  pageHeader: string;
  pageDescription: string;
  buttonValue?: string;
  loading: boolean;
};

export default function DefaultContent({
  pageHeader = "",
  pageDescription = "",
  buttonValue = "",
  loading = false,
  buttonClick,
}: Props) {
  const mode = useRecoilValue<any>(modeAtomsAtom);
  return (
    <>
      <div
        className={`w-full lg:w-[90%] mt-20 rounded-md shadow-md mx-auto lg:flex justify-center items-center border ${mode.mode === "dark" ? "bg-lightDark text-[#7E8299]" : "bg-white"}`}
        style={{ minHeight: "300px" }}
      >
        <div className="space-y-10 w-full flex flex-col items-center">
          {!loading && (
            <div className="center space-y-5">
              <h5
                className="font-semibold text-[18px]"
                style={{ textAlign: "center" }}
              >
                {pageHeader || "Nothing to see here"}
              </h5>
              <p
                className="text-[14px] font-medium"
                style={{ textAlign: "center" }}
              >
                {pageDescription || ""}
              </p>
              {buttonValue && (
                <div className="col text-center">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-white hover:text-primary font-medium
                md:w-50 text-xs shadow-md  rounded md:px-8 py-2 px-3 text-white text-center capitalize"
                    onClick={() => buttonClick("")}
                  >
                    {buttonValue}
                  </button>
                </div>
              )}
            </div>
          )}
          {loading && (
            <div className="center">
              <svg
                className="animate-spin h-10 w-10"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              &nbsp; <span className="text-sm font-medium">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
