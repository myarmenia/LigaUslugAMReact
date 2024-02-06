import animals from "../src/assets/sliderImg/animals.png";
import cargoTransportation from "../src/assets/sliderImg/cargoTransportation.png";
import cleaning from "../src/assets/sliderImg/cleaning.png";
import designerServices from "../src/assets/sliderImg/designerServices.png";
import hosServices from "../src/assets/sliderImg/hosServices.png";
import legalServices from "../src/assets/sliderImg/legalServices.png";
import repairOfBuildings from "../src/assets/sliderImg/repairOfBuildings.png";
import servicesForBusiness from "../src/assets/sliderImg/servicesForBusiness.png";

export const isValidNumber = (value) => {
  if (value.includes(" ")) {
    return false;
  }
  let temp = +value;
  return !isNaN(temp);
};
export const changeDateFormat = (val) => {
  let result = val.split("/");
  result = [result[1], result[0], result[2]];
  return result.join("/");
};
export const isEqualObj = (first, second) =>
  JSON.stringify(first) === JSON.stringify(second);
export const sliderInfo = [
  {
    text: "ՔԻՆՄԱՔՐՄԱՆ ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐ ",
    text2: "Lorem ipsum",
    img: repairOfBuildings,
  },
  {
    text: "ՎԱՐՁԱԿԱԼՈՒԹՅԱՆ ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐ",
    text2: "Lorem ipsum",
    img: designerServices,
  },
  {
    text: "ԱՎՏՈՍՊԱՍԱՐԿՈՒՄ",
    text2: "Lorem ipsum",
    img: hosServices,
  },
  {
    text: "ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐ ԲԻԶՆԵՍԻ ՀԱՄԱՐ",
    text2: "Lorem ipsum",
    img: servicesForBusiness,
  },
  {
    text: "ԻՐԱՎԱԲԱՆԱԿԱՆ ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐ",
    text2: "Lorem ipsum",
    img: legalServices,
  },
  {
    text: "ԲԵՌՆԱՓՈԽԱԴՐՈՒՄՆԵՐ",
    text2: "Lorem ipsum",
    img: cargoTransportation,
  },
  {
    text: "ՏԱՐԱԾՔՆԵՐԻ ՄԱՔՐՈՒՄ ПОМЕЩЕНИЙ",
    text2: "Lorem ipsum",
    img: cleaning,
  },
  {
    text: "ԿԵՆԴԱՆԻՆԵՐ",
    text2: "Lorem ipsum",
    img: animals,
  },
];
