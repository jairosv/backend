import express from 'express';
import {
    getProvincesPostOffice,
    getCantonsPostOffice,
    getDistrictsPostOffice
} from '../controllers/postOfficeCRControllers.js'

const router =  express.Router();

router.get('/provincia',getProvincesPostOffice);
router.get('/canton/:id',getCantonsPostOffice);
router.get('/distritos/:codeProv/:codeCant',getDistrictsPostOffice);



export default router;