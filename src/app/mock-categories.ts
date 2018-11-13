

import { Category } from './category';
import { Activity } from './activity';


export const CATEGORIES: Category[] = [
	{id: 1, name: 'Business', 
		activities : [
			{id: 1, name : 'Meeting', slots: ['9:00', '10:00', '12:00', '14:00', '16:00']}, 
			{id: 2, name : 'Confrence', slots:['11:00', '12:00', '13:00', '15:00', '16:00']}]},
	{id: 2, name: 'Social', 
		activities : [
			{id: 1, name : 'Meeting', slots: ['10:00', '11:00', '13:00', '14:00', '15:00']}, 
			{id: 2, name : 'Coffee', slots: ['8:00', '9:00', '10:00', '12:00', '16:00']}, 
			{id: 3, name : 'Dinner', slots: ['18:00', '19:00', '20:00', '21:00', '22:00']}]},
]
