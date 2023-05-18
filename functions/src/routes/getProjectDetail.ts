import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";
import { AppDataSource } from "../data-source";
import { Project } from "../models/Project";
import { Description } from "../models/Description";
import { Link } from "../models/Link";
import { Reference } from "../models/Reference";
import { Category } from "../models/Category";
import { Tool } from "../models/Tool";
import { Image } from "../models/Image";


/*

    @Column()
    git!       : string;

    @Column()
    figma!         : string;

    @Column()
    figmaJam!        : string;

    @Column()
    prototype!         : string;

    @Column()
    presentation!         : string;

    @Column()
    live!         : string;
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
        const desc = AppDataSource
            .getRepository(Description)
            .createQueryBuilder('description')
            .where('description.projectId = :projectId', {
                projectId: (await project)?.id
            })
            .getOne();

        // Get links
        const link = AppDataSource
            .getRepository(Link)
            .createQueryBuilder('link')
            .where('link.projectId = :projectId', {
                projectId: (await project)?.id
            })
            .getOne();

        // Get references
        const refs = AppDataSource
            .getRepository(Reference)
            .createQueryBuilder('reference')
            .where('reference.projectId = :projectId', {
                projectId: (await project)?.id
            })
            .getOne();

        // Get categories
        const cats = AppDataSource
            .getRepository(Category)
            .createQueryBuilder('category')
            .where('category.projectId = :projectId', {
                projectId: (await project)?.id
            })
            .getMany();

        // Get tools
        const tls = AppDataSource
            .getRepository(Tool)
            .createQueryBuilder('tool')
            .where('tool.projectId = :projectId', {
                projectId: (await project)?.id
            })
            .getMany();

        // Get images
        const img = AppDataSource
            .getRepository(Image)
            .createQueryBuilder('image')
            .where('image.projectId = :projectId', {
                projectId: (await project)?.id
            })
            .getOne();

        



        
        // The response
        const [intro, descriptions, links, references, categories, tools, images] = await Promise.all([
            project,
            desc,
            link,
            refs,
            cats,
            tls,
            img
        ]);

        // Building the HTTP response
        response.status(200).json({ intro, descriptions, links, references, categories,  tools, images });
    }

    catch (error) {
        logger.error(`Error calling getProjectDetail()`);
        return next(error);
    }

}