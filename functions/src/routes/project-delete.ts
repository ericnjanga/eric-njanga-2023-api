import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";
import { isInteger } from '../utils';
import { AppDataSource } from "../data-source";
import { Project } from "../models/Project";
import { Category } from "../models/Category";
import { Industry } from "../models/Industry";
import { Status } from "../models/Status";
import { Technology } from "../models/Technology";
import { Tool } from "../models/Tool";


export async function deleteProjectAndConnections(request: Request, response: Response, next: NextFunction) {

    try {
        logger.debug(`Called deleteProjectAndConnections()`);

        const projectId = request.params.projectId;

        // Validate all parameters
        if (!isInteger(projectId)) {
            throw `Invalid project id ${projectId}`;
        }

        // 1) Delete all records in the database associated with the project
        // Industries / Categories / Statuses / Technologies / Tools
        // ---

        await AppDataSource.manager.transaction(
            async (transactionalEntityManager) => {

                // Delete all links to: industries
                await transactionalEntityManager
                    .createQueryBuilder()
                    .delete()
                    .from(Industry)
                    .where('projectId = :projectId', { projectId })
                    .execute();

                // Delete all links to: categories
                await transactionalEntityManager
                    .createQueryBuilder()
                    .delete()
                    .from(Category)
                    .where('projectId = :projectId', { projectId })
                    .execute();

                // Delete all links to: statuses
                await transactionalEntityManager
                    .createQueryBuilder()
                    .delete()
                    .from(Status)
                    .where('projectId = :projectId', { projectId })
                    .execute();

                // Delete all links to: technologies
                await transactionalEntityManager
                    .createQueryBuilder()
                    .delete()
                    .from(Technology)
                    .where('projectId = :projectId', { projectId })
                    .execute();

                // Delete all links to: tOOLS
                await transactionalEntityManager
                    .createQueryBuilder()
                    .delete()
                    .from(Tool)
                    .where('projectId = :projectId', { projectId })
                    .execute();
                

                // [FINALLY] Delete the project
                await transactionalEntityManager
                .createQueryBuilder()
                .delete()
                .from(Project)
                .where('id = :projectId', { projectId })
                .execute();

            }
        );

        // Building the HTTP response
        response.status(200).json({
            message: `Project delete successfully ${projectId}`
        })
    }
    catch (error) {
        logger.error(`Error calling deleteProjectAndConnections()`);
        return next(error);
    }
}