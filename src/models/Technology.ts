
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./Project";

//Decorator turns the class into a Typeorm model
@Entity({
    name: 'TECHNOLOGIES'
})
export class Technology {

    @PrimaryGeneratedColumn()
    id!          : number;

    @Column()
    seqNo!   : number;

    @Column()
    title!       : string;

    @Column()
    shortDescription!         : string; //shortDescription

    // (1 to a relationship) ...
    // An industry can be tied to only 1 project
    @ManyToOne(() => Project, project => project.technologies)
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