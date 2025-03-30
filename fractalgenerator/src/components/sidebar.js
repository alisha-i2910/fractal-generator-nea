import { createContext, useState, useContext } from "react";
import { individualpoint } from "./individualpoint";

//sharing the state of the sidebar with other files
//it seems to be that this context is what's actually changing the values in other files! yippeeee
    export const sidebarstate = createContext({
    iterationlimit: 90, // Default value
    resolution: 0.004,
    c1: 0,
    c2: 0,
    colour1: "0a0e1f",
    colour2: "1c3b5a",
    colour3: "5a3b1c",
    colour4: "8c5a44",
    colour5: "b0a38c"
  });

export const Sidebar = () => {

    const { iterationlimit, setiterationlimit, resolution, setresolution, c1, setc1, c2, setc2, 
        colour1, setcolour1, colour2, setcolour2, colour3, setcolour3, colour4, setcolour4, colour5, setcolour5
     } = useContext(sidebarstate);
    const { colour, iteration, velocity, withinset } = individualpoint(c1, c2, iterationlimit);

    let maxiteration = false;

    if (iteration === iterationlimit){
        maxiteration = true;
    }

      //functions for colour error handling
  const onEnterKey = (e, defaultcolour, colourset) => {
    if (e.key === "Enter"){
        const input = e.target.value.replace('#', '');
        if (/^([A-Fa-f0-9]{6})/.test(input)){
            switch(colourset) {
                case 1:
                    setcolour1(input);
                    break;
                case 2:
                    setcolour2(input);
                    break;
                case 3:
                    setcolour3(input);
                    break;
                case 4:
                    setcolour4(input);
                    break;
                case 5:
                    setcolour5(input);
                    break;
              }
        }
        e.target.value.replace(input)
    }
    else{
        switch(colourset) {
            case 1:
                setcolour1(defaultcolour);
                break;
            case 2:
                setcolour2(defaultcolour);
                break;
            case 3:
                setcolour3(defaultcolour);
                break;
            case 4:
                setcolour4(defaultcolour);
                break;
            case 5:
                setcolour5(defaultcolour);
                break;
          }
          e.target.value.replace(defaultcolour);
    }
  }


    return(
        <div>

        
            <div>
            <label>Iteration Limit</label>
            <input
            type="text"
            value={iterationlimit}
            onChange={(e) => {
                const itvalue = e.target.value
                if (itvalue == ""){
                    setiterationlimit(0)
                }
                else{
                    setiterationlimit(parseInt(itvalue) || 90)

                }
            }}
            />
            </div>

            <div>
            <label>Resolution</label>
            <input
            type="text"
            value={resolution}
            //for this, we will allow onchange to be a temporary invalid input
            //because onblur is gonna fix it, so we can use "." and such
            onChange={(e) => {
                const resvalue = e.target.value
                if (/^[0-9]*\.?[0-9]*$/.test(resvalue)){
                    setresolution(resvalue)
                }
                else{
                    setresolution(0.004)
                }
            }}
            onBlur={(e) => {
                const floatvalue = parseFloat(resolution)
                if (isNaN(floatvalue)){
                    setresolution(0.004)
                }
                else{
                    setresolution(floatvalue)
                }
            }}
            />

            </div>
            <label>Colour Palette</label>

            <div>
            <input
            type="text"
            defaultValue={`#${colour1}`}
            onKeyDown={(e) => onEnterKey(e, "0a0e1f", 1)}
            onBlur={(e) => {
                if (e.target.value.replace('#','').length < 6) {
                  setcolour1("0a0e1f");
                  e.target.value = "#0a0e1f";
                }
              }}
            />
            </div>
            <div>
            <input
            type="text"
            defaultValue={`#${colour2}`}
            onKeyDown={(e) => onEnterKey(e, "1c3b5a", 2)}
            onBlur={(e) => {
                if (e.target.value.replace('#','').length < 6) {
                  setcolour1("1c3b5a");
                  e.target.value = "#1c3b5a";
                }
              }}
            />
            </div>
            <div>
            <input
            type="text"
            defaultValue={`#${colour3}`}
            onKeyDown={(e) => onEnterKey(e, "5a3b1c", 3)}
            onBlur={(e) => {
                if (e.target.value.replace('#','').length < 6) {
                  setcolour1("5a3b1c");
                  e.target.value = "#5a3b1c";
                }
              }}
            />
            </div>
            <div>
            <input
            type="text"
            defaultValue={`#${colour4}`}
            onKeyDown={(e) => onEnterKey(e, "8c5a44", 4)}
            onBlur={(e) => {
                if (e.target.value.replace('#','').length < 6) {
                  setcolour1("8c5a44");
                  e.target.value = "#8c5a44";
                }
              }}
            />
            </div>
            <div>
            <input
            type="text"
            defaultValue={`#${colour5}`}
            onKeyDown={(e) => onEnterKey(e, "b0a38c", 5)}
            onBlur={(e) => {
                if (e.target.value.replace('#','').length < 6) {
                  setcolour1("b0a38c");
                  e.target.value = "#b0a38c";
                }
              }}
            />
            </div>

            <div>
            <label>C</label>
            <input
            type="text"
            value={c1}
            onChange={(e) => {
                const c1value = e.target.value
                if (/^-?[0-9]*\.?[0-9]*$/.test(c1value)){
                    if (parseFloat(c1value) > 2 || parseFloat(c1value) < -2){
                        setc1(0)
                    }
                    else{
                        setc1(c1value)  
                    }
                }
                else{
                    setc1(0)
                }
            }}

            />
            <input
            type="text"
            value={c2}
            onChange={(e) => {
                const c2value = e.target.value
                if (/^-?[0-9]*\.?[0-9]*$/.test(c2value)){
                    if (parseFloat(c2value) > 2 || parseFloat(c2value) < -2){
                        setc2(0)
                    }
                    else{
                        setc2(c2value)  
                    }
                }
                else{
                    setc2(0)
                }
            }}/>
            </div>

            <div>
                <div><p>{c1} + {c2}i</p></div>
                <div><p>{withinset ? "It reached the iteration limit" : `It ran through the iterative formula ${iteration} times.`}</p></div>
                <div><p>Your colour assigned was {colour}</p></div>
                <div><p>{velocity}</p></div>
            </div>
        </div>
    );
}