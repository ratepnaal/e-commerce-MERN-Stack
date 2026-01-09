import express from 'express'
import { Request } from 'express';

 export interface extendRequest extends Request {
user?:any;
}
