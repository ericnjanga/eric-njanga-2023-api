
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./Project";

//Decorator turns the class into a Typeorm model
@Entity({
    name: 'REFERENCES'
})
export class Reference {

    @PrimaryGeneratedColumn()
    id!          : number;

    @Column()
    name!       : string;

    @Column()
    startDate!         : string; // When the project was started

    @Column()
    endDate!         : string; // When the project has ended

    @Column()
    industry!         : string; // What's the project industry (healthcare, banking, tourism, ...)

    @Column()
    teamCount!        : number; // How many people was in the team?

    // (1 to a relationship) ...
    // A description can be tied to only 1 project
    @OneToOne(() => Project, project => project.references)
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