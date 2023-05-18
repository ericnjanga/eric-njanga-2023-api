
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./Project";

export type statusType = 'draft' | 'published' | 'unpublished' | 'archived';

//Decorator turns the class into a Typeorm model
@Entity({
    name: 'STATUSES'
})
export class Status {

    @PrimaryGeneratedColumn()
    id!          : number;

    @Column()
    seqNo!   : number;

    @Column()
    title!       : statusType;

    @Column()
    shortDescription!         : string; //shortDescription

    // (1 to a relationship) ...
    // An industry can be tied to only 1 project
    @OneToOne(() => Project, project => project.status)
    @JoinColumn({
        //name of the column that we want to use 
        //to link this table to the "project" table
        name: 'projectId'
    })
    project!: Project

    @CreateDateColumn()
    createdAt !      : Date;

    @UpdateDateColumn()
    lastUpdatedAt!   : Date;
}
