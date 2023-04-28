import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";
import { AppDataSource } from "../data-source";
import { Project } from "../models/Project";
import { Industry } from "../models/Industry";
import { Description } from "../models/Description";


/*
    title       : string;

    @Column()
    shortDescription         : string;

    @Column()
    context         : string;

    @Column()
    contribution         : string;

    @Column()
    constraints         : string;
    */




export async function getProjectDetail(request: Request, response: Response, next: NextFunction) {

    try {
        logger.debug(`Called getProjectDetail()`);

        // Get all projects
        const projectPageUrl = request.params.pageUrl;

        // Validate all parameters
        if (!projectPageUrl) {
            throw `Could not extract the project url from the request.`;
        }

        let project = AppDataSource
        .getRepository(Project)
        .findOneBy({
            pageUrl: projectPageUrl
        });

        if (!project) {
            const message = `Could not find a project with pageUrl ${projectPageUrl}`;
            logger.error(message);
            response.status(404).json({ message });
            return;
        }

        // Get descriptions

        // project = (await project).innerJoinAndSelect('projects.status', 'p.stat', 'p.stat.title = :bTitle', { bTitle: status });
        const description = AppDataSource
            .getRepository(Description)
            .createQueryBuilder('description')
            .where('description.projectId = :projectId', {
                projectId: (await project).id
            })
            .getOne();

        
        
        // The response
        const [intro, desc] = await Promise.all([
            project,
            description,
        ]);

        // Building the HTTP response
        response.status(200).json({ intro, desc });
    }

    catch (error) {
        logger.error(`Error calling getProjectDetail()`);
        return next(error);
    }

}