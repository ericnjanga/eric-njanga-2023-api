import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";
// import {
//     isInteger,
//     isStatusType,
//     isIndustryRefType
// } from '../utils';
// import { AppDataSource } from "../data-source";
// import { Project } from "../models/Project";

export const getProjects = async (request: Request, response: Response, next: NextFunction | undefined) => {

    try {
        // logger.debug(`Called getAllProject()`);

        // // Build the query
        // const query = request.query as any,
        //     status = query.status ?? 'all',              // anything by default
        //     industry = query.industry ?? 'all',          // anything by default
        //     pageNumber = query.pageNumber ?? '0',       // default page number
        //     pageSize = query.pageSize ?? '100';         // default page size

        // // Make sure pagination data is ok
        // if (!isInteger(pageNumber)) {
        //     throw `Invalid page number ${pageNumber}`;
        // }

        // if (!isInteger(pageSize)) {
        //     throw `Invalid page size ${pageSize}`;
        // }

        // // Start building the query
        // let projects = AppDataSource
        //     .getRepository(Project)
        //     .createQueryBuilder('projects')
        //     .leftJoinAndSelect('projects.descriptions', 'descriptions')  // with all descriptions
        //     .leftJoinAndSelect('projects.categories', 'categories')     // with all categories
        //     .leftJoinAndSelect('projects.references', 'references')      // with all references
        //     .leftJoinAndSelect('projects.images', 'images')              // with all images
        //     .leftJoinAndSelect('projects.tools', 'tools');              // with all tools

        // // Filter by "status" only if the "status" is provided and of type "status"
        // if (!isStatusType(status)) {
        //     projects = projects.leftJoinAndSelect('projects.status', 'statuses');
        // } else {
        //     projects = projects.innerJoinAndSelect('projects.status', 'statuses', 'statuses.title = :bTitle', { bTitle: status });
        // }

        // // Filter by "industryRef" only if the "industryRef" is provided and of type "industryRef"
        // if (!isIndustryRefType(industry)) {
        //     projects = projects.leftJoinAndSelect('projects.industries', 'industries');
        // } else {
        //     projects = projects.innerJoinAndSelect('projects.industries', 'industries', 'industries.refName = :cTitle', { cTitle: industry });
        // }

        // // Order by the most recent and add the pagination
        // projects = projects.orderBy('projects.seqNo', 'DESC')
        //     .skip(pageNumber * pageSize) // Position from where to start taking results
        //     .take(pageSize);

        // // The response
        // const [payload, total] = await Promise.all([
        //     projects.getMany(),
        //     projects.getCount(),
        // ]);

        // // Building the HTTP response
        // response.status(200).json({ payload, total });
        response.status(200).json({ payload:[1,2,3,4,5] });
    }

    catch (error) {
        logger.error(`Error calling getProjects()`);
        if (next) return next(error);
    }
}

