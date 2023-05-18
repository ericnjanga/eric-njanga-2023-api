
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./Project";

export type industryRefType = 'ux-design' | 'ui-development';

//Decorator turns the class into a Typeorm model
@Entity({
    name: 'INDUSTRIES'
})
export class Industry {

    @PrimaryGeneratedColumn()
    id!          : number;

    @Column()
    seqNo!   : number;

    @Column()
    title!       : string;

    @Column()
    refName!   : industryRefType; 

    @Column()
    shortDescription!         : string; //shortDescription

    // (1 to a relationship) ...
    // An industry can be tied to only 1 project
    @ManyToOne(() => Project, project => project.industries)
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