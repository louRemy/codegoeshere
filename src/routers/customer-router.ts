import url from 'url';
import express = require('express');
import AppConfig from '../config/app'
import { isEmptyObject } from '../util/validator'
import{ ParsedUrlQuery } from 'querystring'
import { Customer } from '../models/customer'
import { CustomerRepo } from '../repos/customer-repo'


export const CustRouter = express.Router();

const customerService = AppConfig.customerService

CustRouter.get('', async( req, resp)=>{
    try{
        let reqURL = url.parse(req.url, true)
        if(!isEmptyObject<ParsedUrlQuery>(reqURL.query)){
            let payload = await customerService.getCustbyUniqueKey({...reqURL.query})
            resp.status(200).json(payload)
        }
        let payload = await customerService.getAllCustomers();
        resp.status(200).json(payload)
    }catch(e){
        resp.status(404).json(e)
    }
})

CustRouter.get('/:key/:value', async (req,resp)=>{
 const key = req.params.id;
 try{
     let payload = await customerService.getCustbyUniqueKey(key)
 }catch(e){
        resp.status(404).json(e)}
})