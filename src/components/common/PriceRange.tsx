"use client"
import { getTrackBackground, Range } from "react-range";
// prop type 
type IProps = {
   STEP: number;
   MIN: number;
   MAX: number;
   values: number[];
   handleChanges: (val: number[]) => void
}
const PriceRange = ({ STEP, MIN, MAX, values, handleChanges }: IProps) => {
   const safeMax = MAX > MIN ? MAX : MIN + 1;
   const safeValues = values.map(v => Math.min(Math.max(v, MIN), safeMax));

   return (
      <>
         <Range
            step={STEP}
            min={MIN}
            max={safeMax}
            values={safeValues}
            onChange={(vals) => handleChanges(vals)}
            renderTrack={({ props, children }) => (
               <div
                  {...props}
                  key='track'
                  style={{
                     ...props.style,
                     height: '4px',
                     width: '100%',
                     // borderRadius: "10px",
                     background: getTrackBackground({
                        values: safeValues,
                        colors: ["#fff", "#000", "#1B1819"],
                        min: MIN,
                        max: safeMax
                     }),
                  }}
               >
                  {children}
               </div>
            )}
            renderThumb={({ props, index }) => (
               <div
                  {...props}
                  key={`thumb-${index}`}
                  className="ui-input"
                  style={{
                     ...props.style,
                     height: '20px',
                     width: '20px',
                     backgroundColor: "#fff",
                     outline: "none",
                     borderRadius: "50px",
                     border: "2px solid #000",
                  }}
               />
            )}
         />
      </>
   );
};


export default PriceRange;