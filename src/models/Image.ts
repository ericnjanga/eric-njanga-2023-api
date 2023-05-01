
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./Project";

export type imageType = 'phone' | 'tablet' | 'laptop' | 'monitor';

//Decorator turns the class into a Typeorm model
@Entity({
    name: 'IMAGES'
})
export class Image {

    @PrimaryGeneratedColumn()
    id          : number;

    @Column()
    hero   : string;

    @Column()
    body      : string;

    @Column()
    type      : imageType;

    // (1 to a relationship) ...
    // An industry can be tied to only 1 project
    @OneToOne(() => Project, project => project.image)
    @JoinColumn({
        //name of the column that we want to use 
        //to link this table to the "project" table
        name: 'projectId'
    })
    project: Project

    @CreateDateColumn()
    createdAt       : Date;

    @UpdateDateColumn()
    lastUpdatedAt   : Date;
}
