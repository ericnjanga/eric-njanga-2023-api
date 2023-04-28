
// Environment variables must be loading before anything else
import * as dotenv from 'dotenv';

const result = dotenv.config();

import 'reflect-metadata'; // works with typeorm library (mustbe imported before any data source)


import { AppDataSource } from '../data-source';
import { Project } from '../models/Project';
import { Category } from '../models/Category';
import { Industry } from '../models/Industry';
import { Technology } from '../models/Technology';
import { Tool } from '../models/Tool';
import { Status } from '../models/Status';
import { Description } from '../models/Description';
import { Link } from '../models/Link';
import { Reference } from "../models/Reference";


async function deleteDb() {


    await AppDataSource.initialize();

    console.log(`Database connection ready.`);

    console.log(`Clearing STATUS table.`);
    await AppDataSource.getRepository(Status)
        .delete({});

    console.log(`Clearing CATEGORY table.`);
    await AppDataSource.getRepository(Category)
        .delete({});

    console.log(`Clearing INDUSRTRY table.`);
    await AppDataSource.getRepository(Industry)
        .delete({});

    console.log(`Clearing TECHNOLOGY table.`);
    await AppDataSource.getRepository(Technology)
        .delete({});

    console.log(`Clearing TOOL table.`);
    await AppDataSource.getRepository(Tool)
        .delete({});

    console.log(`Clearing DESCRIPTION table.`);
    await AppDataSource.getRepository(Description)
        .delete({});

    console.log(`Clearing LINK table.`);
    await AppDataSource.getRepository(Link)
        .delete({});

    console.log(`Clearing REFERENCE table.`);
    await AppDataSource.getRepository(Reference)
        .delete({});

    console.log(`Clearing PROJECTS table.`);
    await AppDataSource.getRepository(Project)
        .delete({});

}
    

deleteDb()
    .then(() => {
        console.log(`Finished deleting database!`);
        process.exit(0);
    })
    .catch(err => {
        console.error(`Error deleting database.`, err);
    });