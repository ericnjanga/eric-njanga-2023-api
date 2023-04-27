
// Environment variables must be loading before anything else
import * as dotenv from 'dotenv';

const result = dotenv.config();

import 'reflect-metadata'; // works with typeorm library (mustbe imported before any data source)


import { PROJECTS } from './db-data';
import { AppDataSource } from '../data-source';
import { DeepPartial } from 'typeorm';
import { Project } from '../models/Project';
import { Category } from '../models/Category';
import { Industry } from '../models/Industry';
import { Technology } from '../models/Technology';
import { Tool } from '../models/Tool';
import { Status } from '../models/Status';


async function populateDb() {

    await AppDataSource.initialize();

    console.log(`Database connection ready.`);

    const projects = Object.values(PROJECTS) as DeepPartial<Project>[];
    
    const projectRepository = AppDataSource.getRepository(Project);
    const industryRepository = AppDataSource.getRepository(Industry);
    const categoryRepository = AppDataSource.getRepository(Category);
    const technologyRepository = AppDataSource.getRepository(Technology);
    const toolRepository = AppDataSource.getRepository(Tool);
    const statusRepository = AppDataSource.getRepository(Status);



    // for (let statusData of statuses) {

    //     // Save statuses
    //     console.log(`Inserting status ${statusData.title}`);
    //     const status = statusRepository.create(statusData);
    //     await statusRepository.save(status);

    //     // // Save status (if any)
    //     // if (projectData.status) {
    //     //     let statusData = projectData.status; 
    //     //     console.log(`Inserting status ${statusData.title}`);
    //     //     const status = statusRepository.create(statusData);
    //     //     status.project = project; // Link status to project
    //     //     await statusRepository.save(status);
    //     // }
    // }








    
    for (let projectData of projects) {
        // Save projects
        console.log(`Inserting project ${projectData.title}`);
        const project = projectRepository.create(projectData);
        await projectRepository.save(project);

        // Save industries (if any)
        if (projectData.industries)
        for(let industryData of projectData.industries) {
            console.log(`Inserting industry ${industryData.title}`);
            const industry = industryRepository.create(industryData);
            industry.project = project; // Link industry to project
            await industryRepository.save(industry);
        }

        // Save categories (if any)
        if (projectData.categories)
        for(let categoryData of projectData.categories) {
            console.log(`Inserting category ${categoryData.title}`);
            const category = categoryRepository.create(categoryData);
            category.project = project; // Link category to project
            await categoryRepository.save(category);
        }

        // Save technologies (if any)
        if (projectData.technologies)
        for(let technologyData of projectData.technologies) {
            console.log(`Inserting technology ${technologyData.title}`);
            const technology = technologyRepository.create(technologyData);
            technology.project = project; // Link technology to project
            await technologyRepository.save(technology);
        }

        // Save tools (if any)
        if (projectData.tools)
        for(let toolData of projectData.tools) {
            console.log(`Inserting tool ${toolData.title}`);
            const tool = toolRepository.create(toolData);
            tool.project = project; // Link tool to project
            await toolRepository.save(tool);
        }

        // Save status (if any)
        if (projectData.status) {
            let statusData = projectData.status; 
            console.log(`Inserting status ${statusData.title}`);
            const status = statusRepository.create(statusData);
            status.project = project; // Link status to project
            await statusRepository.save(status);
        }
    }

    // ...
    const totalProjects = projectRepository
        .createQueryBuilder()
        .getCount();
    const totalCategories = categoryRepository
        .createQueryBuilder()
        .getCount();

    console.log(`Data Inserted - projects ${totalProjects}, categories ${totalCategories}`);
    
}

populateDb()
    .then(() => {
        console.log(`Finished populating database!`);
        process.exit(0);
    })
    .catch(err => {
        console.error(`Error populating database.`, err);
    });