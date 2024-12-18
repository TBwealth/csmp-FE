import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import StepFour from "./components/StepFour";
import Success from "./components/Success";

const SetUp = () => {
  const [steps, setSteps] = useState(1);
  const navigate = useNavigate();
  return (
    <div className="w-full font-medium min-h-screen bg-[#F7F7F8]">
      <div className="flex items-center justify-between w-full px-8 py-4 border-bottom">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-1">
            <svg
              width="28"
              height="32"
              viewBox="0 0 28 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.4212 12.0612C13.4841 11.6256 14.113 11.6256 14.1759 12.0612L15.3231 20.007C15.3563 20.2368 15.178 20.4426 14.9457 20.4426H12.6514C12.4191 20.4426 12.2409 20.2368 12.274 20.007L13.4212 12.0612Z"
                fill="#284CB3"
              />
              <path
                d="M11.291 14.0801C11.291 12.6875 12.4202 11.5586 13.8132 11.5586C15.2062 11.5586 16.3354 12.6875 16.3354 14.0801C16.3354 15.4727 15.2062 16.6017 13.8132 16.6017C12.4202 16.6017 11.291 15.4727 11.291 14.0801Z"
                fill="#284CB3"
              />
              <path
                d="M4.80422 10.8841C4.80422 10.8151 4.84084 10.7513 4.9003 10.7168L13.716 5.60119C13.7755 5.56669 13.8487 5.56669 13.9082 5.60119L21.3293 9.90753C21.3888 9.94203 21.462 9.94203 21.5215 9.90753L25.9411 7.34289C26.0692 7.26855 26.0692 7.08272 25.9411 7.00838L13.9082 0.0258777C13.8488 -0.00862581 13.7755 -0.00862595 13.716 0.0258776L0.0960793 7.92931C0.036625 7.96381 0 8.02756 0 8.09656V22.0616C0 22.2102 0.160146 22.3032 0.288258 22.2288L4.70814 19.664C4.76759 19.6295 4.80422 19.5658 4.80422 19.4968V10.8841Z"
                fill="#284CB3"
              />
              <path
                d="M6.38749 22.1462C6.32803 22.1117 6.25477 22.1117 6.19531 22.1462L1.77567 24.7108C1.64757 24.7852 1.64757 24.971 1.77567 25.0453L13.716 31.9741C13.7755 32.0086 13.8488 32.0086 13.9082 31.9741L27.5282 24.0707C27.5876 24.0362 27.6242 23.9724 27.6242 23.9034V10.0459C27.6242 9.89718 27.4641 9.80426 27.336 9.87861L22.9161 12.4434C22.8566 12.4779 22.82 12.5416 22.82 12.6106V21.1159C22.82 21.1849 22.7834 21.2487 22.7239 21.2832L13.9082 26.3988C13.8488 26.4333 13.7755 26.4333 13.716 26.3988L6.38749 22.1462Z"
                fill="#284CB3"
              />
            </svg>
            <p className="font-extrabold text-[18px] text-[#284CB3]">
              Cloud<span className="font-light">Accord</span>
            </p>
          </Link>
          <p className="text-[#373737] font-medium text-[18px]">
            Setup Account
          </p>
        </div>
        <svg
          width="18"
          height="17"
          viewBox="0 0 18 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.4378 7.18662C2.47181 3.59144 5.39678 0.6875 9 0.6875C12.6032 0.6875 15.5282 3.59144 15.5622 7.18662C16.4472 7.43708 17.0625 8.246 17.0625 9.17104V10.5786C17.0625 11.5036 16.4473 12.3124 15.5625 12.563V12.875C15.5625 14.0141 14.6391 14.9375 13.5 14.9375H11.7165C11.4848 15.5929 10.8597 16.0625 10.125 16.0625H7.875C6.94301 16.0625 6.1875 15.307 6.1875 14.375C6.1875 13.443 6.94301 12.6875 7.875 12.6875H10.125C10.8597 12.6875 11.4848 13.1571 11.7165 13.8125H13.5C14.0178 13.8125 14.4375 13.3928 14.4375 12.875V12.8453L14.1956 12.9057C14.1956 12.9057 14.1956 12.9057 14.1956 12.9057C13.5565 13.0655 12.9375 12.5821 12.9375 11.9235V7.82622C12.9375 7.16752 13.5565 6.68412 14.1956 6.84395L14.4265 6.90168C14.2469 4.06094 11.8861 1.8125 9 1.8125C6.11396 1.8125 3.75307 4.06094 3.57348 6.90168L3.8044 6.84395C3.80438 6.84395 3.80441 6.84394 3.8044 6.84395C4.44347 6.68415 5.0625 7.16751 5.0625 7.82622V11.9235C5.0625 12.5822 4.44351 13.0655 3.80443 12.9057C3.80442 12.9057 3.80444 12.9057 3.80443 12.9057L2.49977 12.5796C1.58163 12.35 0.9375 11.5251 0.9375 10.5786V9.17104C0.9375 8.246 1.55277 7.4371 2.4378 7.18662ZM2.6362 7.71582L2.61346 7.62486L2.6362 7.71582ZM14.0625 7.9703V11.7794L15.2274 11.4882C15.2274 11.4882 15.2274 11.4882 15.2274 11.4882C15.6447 11.3838 15.9375 11.0089 15.9375 10.5786V9.17104C15.9375 8.74082 15.6447 8.36587 15.2274 8.26152C15.2274 8.26152 15.2274 8.26152 15.2274 8.26152L14.0625 7.9703ZM3.9375 7.97029L2.77263 8.26152C2.35526 8.36587 2.0625 8.74082 2.0625 9.17104V10.5786C2.0625 11.0089 2.35526 11.3838 2.77263 11.4882L3.9375 11.7794V7.97029ZM7.875 13.8125C7.56435 13.8125 7.3125 14.0644 7.3125 14.375C7.3125 14.6856 7.56435 14.9375 7.875 14.9375H10.125C10.4356 14.9375 10.6875 14.6856 10.6875 14.375C10.6875 14.0644 10.4356 13.8125 10.125 13.8125H7.875Z"
            fill="#373737"
          />
        </svg>
      </div>
      <div className="w-full flex items-center justify-center pt-8">
        {steps === 1 && (
          <StepOne
            next={() => setSteps((steps) => steps + 1)}
            handleHide={() => {
              sessionStorage.setItem("top-title", "Dashboard");
                sessionStorage.setItem(
                  "children",
                  JSON.stringify([
                    {
                      title: "Dashboard",
                      href: "/dashboard",
                    },
                  ])
                );
                navigate("/dashboard");
              navigate("/dashboard");
            }}
            inModal={false}
            showCancel={false}
          />
        )}
        {steps === 2 && (
          <StepTwo
            goBack={() => setSteps((steps) => steps - 1)}
            next={() => setSteps((steps) => steps + 1)}
            handleHide={() => {}}
          />
        )}
        {steps === 3 && (
          <StepThree
            goBack={() => setSteps((steps) => steps - 1)}
            next={() => setSteps((steps) => steps + 1)}
            handleHide={() => {}}
          />
        )}
        {steps === 4 && (
          <StepFour
            goBack={() => setSteps((steps) => steps - 1)}
            next={() => setSteps((steps) => steps + 1)}
            handleHide={() => {}}
            inModal={false}
          />
        )}
        {steps === 5 && (
          <Success
            handleHide={() => {
                sessionStorage.removeItem("type");
                sessionStorage.removeItem("data");
                sessionStorage.setItem("top-title", "Dashboard");
                sessionStorage.setItem(
                  "children",
                  JSON.stringify([
                    {
                      title: "Dashboard",
                      href: "/dashboard",
                    },
                  ])
                );
                navigate("/dashboard");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SetUp;
