import * as d from '../declarations';
import { PROP_TYPE } from './constants';
export declare function parseComponentLoader(cmpData: d.ComponentHostData, i?: number, d?: d.ComponentMemberData): d.ComponentMeta;
export declare function parsePropertyValue(propType: d.PropertyType | PROP_TYPE, propValue: any): any;
