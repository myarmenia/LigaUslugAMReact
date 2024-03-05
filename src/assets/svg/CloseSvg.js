export const CloseSvg = ({ size = 21, color = '#EA004F' }) => {
   return (
      <svg
         width={size}
         height={size}
         viewBox="0 0 20 21"
         fill="none"
         xmlns="http://www.w3.org/2000/svg">
         <path
            d="M1.41309 1.96155L18.8144 19.3628"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
         />
         <path
            d="M18.8145 1.96155L1.41317 19.3628"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
         />
      </svg>
   );
};
