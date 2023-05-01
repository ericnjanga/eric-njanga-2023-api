
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
import { Description } from '../models/Description';
import { Link } from '../models/Link';
import { Reference } from "../models/Reference";
import { Image } from "../models/Image";


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
    const descriptionRepository = AppDataSource.getRepository(Description);
    const linkRepository = AppDataSource.getRepository(Link);
    const referenceRepository = AppDataSource.getRepository(Reference);
    const imageRepository = AppDataSource.getRepository(Image);


    
    for (let projectData of projects) {
        // Save projects
        console.log(`Inserting project ${projectData?.descriptions?.title}`);
        const project = projectRepository.create(projectData);
        await projectRepository.save(project);

        // Save industries (if any)
        if (projectData.industries)
        for(let industryData of projectData.industries) {
            console.log(`--------> Inserting industry ${industryData.title}`);
            const industry = industryRepository.create(industryData);
            industry.project = project; // Link industry to project
            await industryRepository.save(industry);
        }

        // Save categories (if any)
        if (projectData.categories)
        for(let categoryData of projectData.categories) {
            console.log(`--------> (1) Inserting category ${categoryData.title}`);
            const category = categoryRepository.create(categoryData);
            category.project = project; // Link category to project
            await categoryRepository.save(category);
        }

        // Save technologies (if any)
        if (projectData.technologies)
        for(let technologyData of projectData.technologies) {
            console.log(`--------> (2) Inserting technology ${technologyData.title}`);
            const technology = technologyRepository.create(technologyData);
            technology.project = project; // Link technology to project
            await technologyRepository.save(technology);
        }

        // Save tools (if any)
        if (projectData.tools)
        for(let toolData of projectData.tools) {
            console.log(`--------> (3) Inserting tool ${toolData.title}`);
            const tool = toolRepository.create(toolData);
            tool.project = project; // Link tool to project
            await toolRepository.save(tool);
        }

        // Save status (if any)
        if (projectData.status) {
            let statusData = projectData.status; 
            console.log(`--------> (4) Inserting status ${statusData.title}`);
            const status = statusRepository.create(statusData);
            status.project = project; // Link status to project
            await statusRepository.save(status);
        }

        // Save the description (if any)
        if (projectData.descriptions) {
            let descriptionData = projectData.descriptions; 
            console.log(`--------> (5) Inserting description ${descriptionData.title}`);
            const description = descriptionRepository.create(descriptionData);
            description.project = project; // Link description to project
            await descriptionRepository.save(description);
        }

        // Save the link (if any)
        if (projectData.links) {
            let linkData = projectData.links; 
            console.log(`--------> (6) Inserting link ${linkData.id}`);
            const link = linkRepository.create(linkData);
            link.project = project; // Link link to project
            await linkRepository.save(link);
        }

        // Save the reference (if any)
        if (projectData.references) {
            let referenceData = projectData.references; 
            console.log(`--------> (7) Inserting reference ${referenceData.name}`);
            const reference = referenceRepository.create(referenceData);
            reference.project = project; // Link reference to project
            await referenceRepository.save(reference);
        }

        // Save images (if any)
        if (projectData.images) {
            let imageData = projectData.images; 
            console.log(`--------> (8) Inserting image ${imageData.hero}`);
            const image = imageRepository.create(imageData);
            image.project = project; // Link image to project
            await imageRepository.save(image);
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