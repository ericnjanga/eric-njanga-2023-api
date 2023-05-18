import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";
import { isInteger } from '../utils';
import { AppDataSource } from "../data-source";
import { Project } from "../models/Project";


export async function updateProject(request: Request, response: Response, next: NextFunction) {

    try {
        logger.debug(`Called updateProject()`);

        const projectId = request.params.projectId,
            changes = request.body;

        if (!isInteger(projectId)) {
            throw `Invalid project id ${projectId}`;
        }

        // Building the endpoint
        /*const projects = */ await AppDataSource
            // .getRepository(Project)
            .createQueryBuilder()
            .update(Project)
            .set(changes)
            .where('id = :projectId ', { projectId })
            .execute();

            // Building the HTTP response
            response.status(200).json({
                message: `Project ${projectId} was updated successfully.`
            })
    }
    catch (error) {
        logger.error(`Error calling updateProject()`);
        return next(error);
    }
}