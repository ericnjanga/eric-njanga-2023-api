import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";
import { AppDataSource } from "../data-source";
import { Project } from "../models/Project";
import { Description } from "../models/Description";
import { Link } from "../models/Link";


/*

    @Column()
    git       : string;

    @Column()
    figma         : string;

    @Column()
    figmaJam         : string;

    @Column()
    prototype         : string;

    @Column()
    presentation         : string;

    @Column()
    live         : string;
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
        const description = AppDataSource
            .getRepository(Description)
            .createQueryBuilder('description')
            .where('description.projectId = :projectId', {
                projectId: (await project).id
            })
            .getOne();

        // Get links
        const links = AppDataSource
            .getRepository(Link)
            .createQueryBuilder('link')
            .where('link.projectId = :projectId', {
                projectId: (await project).id
            })
            .getOne();

        
        
        // The response
        const [intro, desc, link] = await Promise.all([
            project,
            description,
            links
        ]);

        // Building the HTTP response
        response.status(200).json({ intro, desc, link });
    }

    catch (error) {
        logger.error(`Error calling getProjectDetail()`);
        return next(error);
    }

}