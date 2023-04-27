import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";
import { AppDataSource } from "../data-source";
import { Project } from "../models/Project";
import { Industry } from "../models/Industry";

export async function getProjectDetail(request: Request, response: Response, next: NextFunction) {

    try {
        logger.debug(`Called getProjectDetail()`);

        // Get all projects
        const projectPageUrl = request.params.pageUrl;

        // Validate all parameters
        if (!projectPageUrl) {
            throw `Could not extract the project url from the request.`;
        }

        const project = await AppDataSource
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

        // Building the endpoint
        const totalIndustries = await AppDataSource
            .getRepository(Industry)
            .createQueryBuilder('industries')
            .where('industries.projectId = :projectId', {
                projectId: project.id
            })
            .getCount();

        // Building the HTTP response
        response.status(200).json(project);
    }

    catch (error) {
        logger.error(`Error calling getProjectDetail()`);
        return next(error);
    }

}