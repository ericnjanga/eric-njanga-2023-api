
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./Project";

//Decorator turns the class into a Typeorm model
@Entity({
    name: 'DESCRIPTIONS'
})
export class Description {

    @PrimaryGeneratedColumn()
    id!          : number;

    @Column()
    title!       : string;

    @Column()
    context!         : string;

    // @Column() --- erase this after May 2nd
    // contribution         : string;

    @Column()
    constraints!         : string;

    // (1 to a relationship) ...
    // A description can be tied to only 1 project
    @OneToOne(() => Project, project => project.descriptions)
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