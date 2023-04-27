import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";
import { isInteger } from '../utils';
import { AppDataSource } from "../data-source";
import { Project } from "../models/Project";


export async function createProject(request: Request, response: Response, next: NextFunction) {

    try {
        logger.debug(`Called createProject()`);

        const data = request.body;

        if (!data) {
            throw `No data available, cannot save project.`;
        }

        const project = await AppDataSource.manager.transaction(
            "REPEATABLE READ", // Prevents duplicate data in case both users are posting at the exact same time
            async (transactionalEntityManager) => {

                const repository = transactionalEntityManager.getRepository(Project);
                const result = await repository
                    .createQueryBuilder('projects')
                    .select('MAX(projects.seqNo)', 'max')
                    .getRawOne();

                // Write new project in the database
                const project = repository
                    .create({
                        ...data,
                        seqNo: (result?.max ?? 0) + 1
                    });

                await repository.save(project);

                return project;
            }
        );

        // Building the HTTP response
        response.status(200).json({ project })
    }
    catch (error) {
        logger.error(`Error calling createProject()`);
        return next(error);
    }
}