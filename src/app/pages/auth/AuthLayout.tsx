import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import authBg from "../../../../public/media/logos/authbg.svg";

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.style.height = "100vh";
    }
    return () => {
      if (root) {
        root.style.height = "auto";
      }
    };
  }, []);

  return (
    <div className="flex items-start flex-col md:flex-row w-full">
      <div className="md:w-[50%] relative overflow-hidden px-10 pt-24 md:h-screen bg-gradient-to-r from-[#1F3A89] to-[#2E54C3]">
        <div className="flex items-center gap-3 mb-14 w-fit mx-auto">
          <svg
            width="45"
            height="52"
            viewBox="0 0 45 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.6016 19.4411C21.7028 18.7389 22.7151 18.7389 22.8164 19.4411L24.6628 32.2501C24.7162 32.6205 24.4293 32.9523 24.0555 32.9523H20.3625C19.9887 32.9523 19.7017 32.6205 19.7551 32.2501L21.6016 19.4411Z"
              fill="url(#paint0_linear_424_8403)"
            />
            <path
              d="M18.1729 22.6957C18.1729 20.4507 19.9905 18.6309 22.2326 18.6309C24.4747 18.6309 26.2923 20.4507 26.2923 22.6957C26.2923 24.9406 24.4747 26.7605 22.2326 26.7605C19.9905 26.7605 18.1729 24.9406 18.1729 22.6957Z"
              fill="url(#paint1_linear_424_8403)"
            />
            <path
              d="M7.7328 17.5456C7.7328 17.4344 7.79175 17.3316 7.88745 17.276L22.0771 9.02936C22.1728 8.97374 22.2908 8.97374 22.3865 9.02936L34.3314 15.9714C34.4271 16.027 34.545 16.027 34.6407 15.9714L41.7545 11.837C41.9607 11.7172 41.9607 11.4176 41.7545 11.2978L22.3865 0.041716C22.2908 -0.0139052 22.1728 -0.0139054 22.0771 0.0417158L0.154648 12.7824C0.0589511 12.838 0 12.9408 0 13.052V35.5642C0 35.8039 0.257768 35.9536 0.463977 35.8338L7.57816 31.6993C7.67385 31.6436 7.7328 31.5409 7.7328 31.4296V17.5456Z"
              fill="url(#paint2_linear_424_8403)"
            />
            <path
              d="M10.2812 35.7006C10.1855 35.645 10.0676 35.645 9.9719 35.7006L2.8581 39.8349C2.6519 39.9547 2.6519 40.2543 2.8581 40.3741L22.0771 51.5437C22.1728 51.5993 22.2908 51.5993 22.3865 51.5437L44.309 38.803C44.4047 38.7474 44.4636 38.6446 44.4636 38.5334V16.1944C44.4636 15.9547 44.2058 15.8049 43.9996 15.9247L36.8855 20.0593C36.7898 20.1149 36.7308 20.2177 36.7308 20.3289V34.0398C36.7308 34.151 36.6719 34.2538 36.5762 34.3094L22.3865 42.556C22.2908 42.6116 22.1728 42.6116 22.0771 42.556L10.2812 35.7006Z"
              fill="url(#paint3_linear_424_8403)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_424_8403"
                x1="18.1729"
                y1="18.6309"
                x2="30.2866"
                y2="24.0919"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.198551" stop-color="white" />
                <stop offset="0.683389" stop-color="#CBCBCB" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_424_8403"
                x1="18.1729"
                y1="18.6309"
                x2="30.2866"
                y2="24.0919"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.198551" stop-color="white" />
                <stop offset="0.683389" stop-color="#CBCBCB" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_424_8403"
                x1="0"
                y1="0"
                x2="54.3081"
                y2="37.2217"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.21" stop-color="white" />
                <stop offset="0.61" stop-color="#F7F7F8" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_424_8403"
                x1="0"
                y1="0"
                x2="54.3081"
                y2="37.2217"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.21" stop-color="white" />
                <stop offset="0.61" stop-color="#F7F7F8" />
              </linearGradient>
            </defs>
          </svg>
          <p className="font-extrabold text-[24px] text-[#F7F7F8]">
            Cloud<span className="font-normal">Accord</span>
          </p>
        </div>
        <h1 className="text-[#F7F7F8] w-fit mx-auto font-semibold text-[24px] md:text-[48px] text-ceter">
          Your Gateway to Digital
        </h1>
        <h1 className="text-[#F7F7F8] w-fit mx-auto font-semibold text-[24px] md:text-[48px] text-ceter">
          Transformation
        </h1>
        <p className="text-[#BABECA] text-[12px] md:text-[18px] md:w-[85%] text-center mx-auto font-medium">
          In the modern business landscape, embracing the cloud is not just
          about staying current; it’s about unlocking potential and fostering
          innovation.
        </p>
        <img
          src={authBg}
          alt="decorative background"
          className="absolute bottom-16 left-0 max-w-full h-[400px]"
        />
        <div className="z-20 relative w-48 md:w-64 mx-auto md:mt-32 p-4 md:-mb-72 rounded-t-full bg-gradient-to-r flex items-center justify-center flex-col from-[#2E54C3] to-[#1F3A89] h-96 shadow-lg">
          <svg
            width="100"
            height="157"
            viewBox="0 0 140 197"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M109.42 69.3198V39.3758C109.406 28.9369 105.248 18.9297 97.8585 11.5483C90.4689 4.16698 80.4505 0.0139639 70 0C48.2901 0 30.6238 17.6652 30.6238 39.3758V69.2887C12.1588 81.9121 0 103.129 0 127.078C0 165.597 31.4413 197 70 197C108.559 197 140 165.597 140 127.078C140 103.148 127.86 81.9462 109.42 69.3198ZM74.8051 137.146V159.341C74.808 159.59 74.7611 159.836 74.6671 160.066C74.5732 160.297 74.4341 160.506 74.258 160.681C74.0819 160.857 73.8723 160.995 73.6417 161.089C73.4112 161.182 73.1642 161.229 72.9154 161.226H67.0847C66.8358 161.229 66.5888 161.182 66.3583 161.089C66.1277 160.995 65.9182 160.857 65.7421 160.681C65.566 160.506 65.4269 160.297 65.3329 160.066C65.2389 159.836 65.192 159.59 65.1949 159.341V136.634C65.3255 132.306 60.393 133.119 60.393 126.178C60.393 123.632 61.4051 121.192 63.2068 119.392C65.0085 117.592 67.452 116.581 70 116.581C72.548 116.581 74.9915 117.592 76.7932 119.392C78.5949 121.192 79.6071 123.632 79.6071 126.178C79.6071 133.036 74.8051 132.048 74.8051 137.146ZM94.3207 61.4837C78.645 55.6656 61.3986 55.6656 45.7229 61.4837V39.3913C45.7229 32.954 48.2829 26.7804 52.8398 22.2285C57.3967 17.6767 63.5773 15.1194 70.0218 15.1194C76.4662 15.1194 82.6467 17.6767 87.2037 22.2285C91.7606 26.7804 94.3207 32.954 94.3207 39.3913V61.4837Z"
              fill="white"
            />
          </svg>
          <p className="text-[#FFFFFF] w-32 text-center">
            Cloud Secure and safe
          </p>
        </div>
       
      </div>
      <div className="w-full md:w-[50%] -order-1 md:order-1">
        <Outlet />
      </div>
    </div>
    // <div className="d-flex justify-content-center align-items-center h-100">
    //   <div className="w-100">
    //     <div className="d-flex justify-content-center">
    //       <Outlet />
    //     </div>
    //   </div>
    // </div>
  );
};

export { AuthLayout };
