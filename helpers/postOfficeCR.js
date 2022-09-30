import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';


const parser = new XMLParser();

const getTokenPostOffice = async (req) => {
    try {
          const response = await axios.post(
            process.env.DEV_URL_TOKEN,
            req.body,
            {
              headers: {
              "Content-Type": "application/json",
              },
            }
          );
      
          const data = response?.data;
          return { postToke: data };
      } catch (error) {
          console.log("Error:",error);
      }
  };
  
  const getToken = async () => {
    try {
      const credentials = {
        body: {
          Username: process.env.DEV_OFFICE_USERNAME,
          Password: process.env.DEV_OFFICE_PASSWORD,
          Sistema: process.env.DEV_OFFICE_SYSTEM,
        },
      };
      const auth = await getTokenPostOffice(credentials);

      return auth;
  
    } catch (error) {
      console.log("Error:",error);
    }
  };

const getXmlProvinces = (data) => {    
    let arrayProvinces = [];
    let provinces = parser.parse(data);
    provinces =
      provinces["s:Envelope"]["s:Body"]["ccrCodProvinciaResponse"][
        "ccrCodProvinciaResult"
      ]["a:Provincias"]["a:ccrItemGeografico"];
    for (let i = 0; i < provinces.length; i++) {
      arrayProvinces.push({
        code: provinces[i]["a:Codigo"],
        description: provinces[i]["a:Descripcion"],
      });
    }
    return arrayProvinces;
};

const getXmlCantons = (data) => {
    let arrayCantons = [];
    let cantons = parser.parse(data);
    cantons =
      cantons["s:Envelope"]["s:Body"]["ccrCodCantonResponse"][
        "ccrCodCantonResult"
      ]["a:Cantones"]["a:ccrItemGeografico"];
    for (let i = 0; i < cantons.length; i++) {
      arrayCantons.push({
        code: cantons[i]["a:Codigo"],
        description: cantons[i]["a:Descripcion"],
      });
    }
    return arrayCantons;
  };

const getXmlDistricts = (data) => {
    let arrayDistricts = [];
    let districts = parser.parse(data);
    districts =
      districts["s:Envelope"]["s:Body"]["ccrCodDistritoResponse"][
        "ccrCodDistritoResult"
      ]["a:Distritos"]["a:ccrItemGeografico"];
    for (let i = 0; i < districts.length; i++) {
      arrayDistricts.push({
        code: districts[i]["a:Codigo"],
        description: districts[i]["a:Descripcion"],
      });
    }
    return arrayDistricts;
  };

const addZeroInNumber = (num) => {
    return num > 0 && num < 10 ? `0${num}` : num;
  };

export {
    getToken,
    getXmlProvinces,
    getXmlCantons,
    getXmlDistricts,
    addZeroInNumber
}