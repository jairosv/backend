import axios from 'axios';
import { getToken, getXmlProvinces, getXmlCantons, addZeroInNumber, getXmlDistricts } from '../helpers/postOfficeCR.js';

import dotenv from 'dotenv';

dotenv.config();


const getProvincesPostOffice = async (req, res) => {
	console.log(req.body)
  const auth = await getToken();
  const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:ccrCodProvincia/>
   </soapenv:Body>
</soapenv:Envelope>`;

  try {
    
    const response = await axios.post(
        `${process.env.DEV_URL_WEB_SERVICE}/wsAppCorreos.wsAppCorreos.svc`,
      xml,
      {
        headers: {
          SOAPAction: "http://tempuri.org/IwsAppCorreos/ccrCodProvincia",
          "Content-Type": "text/xml; charset=utf-8",
          Authorization: auth.postToke
        },
      }
    );
    const data = response?.data;    
    const provinces = getXmlProvinces(data);
    return res.json(provinces);
  
} catch (error) {
      console.error(error);
      res.status(500).send(error);

  }
};

const getCantonsPostOffice = async (req, res) => {
    const { id } =  req.params;
    
    const auth = await getToken();
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
    <soapenv:Header/>
    <soapenv:Body>
        <tem:ccrCodCanton>
            <!--Optional:-->
            <tem:CodProvincia>${id}</tem:CodProvincia>
        </tem:ccrCodCanton>
    </soapenv:Body>
    </soapenv:Envelope>`;

    try {
        const response = await axios.post(
            `${process.env.DEV_URL_WEB_SERVICE}/wsAppCorreos.wsAppCorreos.svc`,//"http://amistad.correos.go.cr:84/wsAppCorreos.wsAppCorreos.svc",
        xml,
        {
            headers: {
            SOAPAction: "http://tempuri.org/IwsAppCorreos/ccrCodCanton",
            "Content-Type": "text/xml; charset=utf-8",
            Authorization: auth.postToke,
            },
        }
        );
        const data = response?.data;
        const cantons = getXmlCantons(data);
        return res.json(cantons);
    } catch (error) {
        console.log(error.response);
        res.status(500).send(error);

    }
};

const getDistrictsPostOffice = async (req, res) => {
    let {codeCant, codeProv }= req.params;
   
    const auth = await getToken();    
    codeCant = addZeroInNumber(codeCant);

    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
    <soapenv:Header/>
    <soapenv:Body>
        <tem:ccrCodDistrito>
            <!--Optional:-->
            <tem:CodProvincia>${codeProv}</tem:CodProvincia>
            <!--Optional:-->
            <tem:CodCanton>${codeCant}</tem:CodCanton>
        </tem:ccrCodDistrito>
    </soapenv:Body>
    </soapenv:Envelope>`;

    try {
        const response = await axios.post(
          `${process.env.DEV_URL_WEB_SERVICE}/wsAppCorreos.wsAppCorreos.svc`,
        xml,
        {
            headers: {
            SOAPAction: "http://tempuri.org/IwsAppCorreos/ccrCodDistrito",
            "Content-Type": "text/xml; charset=utf-8",
            Authorization: auth.postToke,
            },
        }
        );
        const data = response?.data;
        const districts = getXmlDistricts(data);
        return res.json(districts);
    } catch (error) {
        res.status(500).send(error);
    }
};
/*
exports.getPostTarifasOffice = async (req) => {
  const auth = await getToken();
  const provorig = req.params.provorig;
  const cantorig = Logic.addZeroInNumber(req.params.cantorig);
  const distorig = Logic.addZeroInNumber(req.params.distorig);
  const provdest = req.params.provdest;
  const cantdest = Logic.addZeroInNumber(req.params.cantdest);
  const distdest = Logic.addZeroInNumber(req.params.distdest);
  const peso = req.params.peso;
  const serv = enviroments.postService;
  const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/" xmlns:wsap="http://schemas.datacontract.org/2004/07/wsAppCorreos">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:ccrTarifa>
         <!--Optional:-->
         <tem:reqTarifa>
            <!--Optional:-->
            <wsap:CantonDestino>${cantdest}</wsap:CantonDestino>
            <!--Optional:-->
            <wsap:CantonOrigen>${cantorig}</wsap:CantonOrigen>
            <!--Optional:-->
            <wsap:DistritoDestino>${distdest}</wsap:DistritoDestino>
            <!--Optional:-->
            <wsap:DistritoOrigen>${distorig}</wsap:DistritoOrigen>
            <!--Optional:-->
            <wsap:Peso>${peso}</wsap:Peso>
            <!--Optional:-->
            <wsap:ProvinciaDestino>${provdest}</wsap:ProvinciaDestino>
            <!--Optional:-->
            <wsap:ProvinciaOrigen>${provorig}</wsap:ProvinciaOrigen>
            <!--Optional:-->
            <wsap:Servicio>${serv}</wsap:Servicio>
         </tem:reqTarifa>
      </tem:ccrTarifa>
   </soapenv:Body>
</soapenv:Envelope>`;

  try {
    const response = await axios.post(
      "http://amistad.correos.go.cr:84/wsAppCorreos.wsAppCorreos.svc",
      xml,
      {
        headers: {
          SOAPAction: "http://tempuri.org/IwsAppCorreos/ccrTarifa",
          "Content-Type": "text/xml; charset=utf-8",
          Authorization: auth,
        },
      }
    );
    const data = response?.data;
    const districts = Logic.getXmlTarifas(data);
    return districts;
  } catch (error) {
    console.log(error.response);
  }
};*/

export{ 
    getProvincesPostOffice,
    getCantonsPostOffice,
    getDistrictsPostOffice
}