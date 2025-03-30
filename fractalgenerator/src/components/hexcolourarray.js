export function generatecolourarray(colourinput){

    if (!colourinput || !Array.isArray(colourinput) || colourinput.length < 5) {
        colourinput = ["70674c", "04131c", "0aa846", "8c5a44", "b0a38c"];
      }

let value = [];
let R = [];
let G = [];
let B = [];
let Rdec = [];
let Gdec = [];
let Bdec = [];

//-> For each hex, split into its components: 2Red, 2Green, 2Blue
function interpolate(min, max, interpolation){
    let value = min + (max - min) * interpolation
    return value;
}
for (let i = 0; i < 5; i++){
    value.push(colourinput[i].split(''))
    R.push(value[i][0] + value[i][1])
    G.push(value[i][2] + value[i][3])
    B.push(value[i][4] + value[i][5])
}

//Converting these into their decimal equivalent
//X*16^Y => y how far right , x the actual value
for (let i = 0; i < R.length; i++) {
    //converting R/G/B[i] into its decimal..
    let pushed = parseInt(R[i], 16);
    Rdec.push(pushed);

    pushed = parseInt(G[i], 16);
    Gdec.push(pushed);

    pushed = parseInt(B[i], 16);
    Bdec.push(pushed);
}

//producing the variety in RGB
let Rresult = [];
let Gresult = [];
let Bresult = [];

for (let j = 0; j < 4; j++){
    for (let i = 0; i < 100; i++){
        Rresult.push(Math.max(interpolate(Rdec[j], Rdec[j + 1], 0.01 * i)));
        Gresult.push(Math.max(interpolate(Gdec[j], Gdec[j + 1], 0.01 * i)));
        Bresult.push(Math.max(interpolate(Bdec[j], Bdec[j + 1], 0.01 * i)));
    }
}
//converting this into a colour array

let newcolourarray = [];

for (let i = 0; i < Rresult.length; i++) {
    R = (Math.floor(Rresult[i]).toString(16))
    G = (Math.floor(Gresult[i]).toString(16))
    B = (Math.floor(Bresult[i]).toString(16))
    newcolourarray.push(R.padStart(2, "0") + G.padStart(2, "0") + B.padStart(2, "0"))
  }

  
// for (let j = 0; j < 100; j++){
//     for (let i = 0; i < 399; i++){
//     R = (Math.floor(Rresult[i]).toString(16))
//     G = (Math.floor(Gresult[i]).toString(16))
//     B = (Math.floor(Bresult[i]).toString(16))
//     newcolourarray.push(R.padStart(2, "0") + G.padStart(2, "0") + B.padStart(2, "0"))
//     }
// }

return newcolourarray

}