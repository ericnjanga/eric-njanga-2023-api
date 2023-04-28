
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./Category";
import { Industry } from "./Industry";
import { Description } from "./Description";
import { Technology } from "./Technology";
import { Tool } from "./Tool";
import { Status } from "./Status";

//Decorator turns the class into a Typeorm model
@Entity({
    name: 'PROJECTS'
})
export class Project {

    @PrimaryGeneratedColumn()
    id      : number;

    @Column()
    seqNo   : number;

    @Column()
    title   : string; 

    @Column()
    refName    : string;

    @Column()
    pageUrl     : string;

    @Column()
    liveUrl     : string;

    @Column()
    thumbnail           : string;

    @Column()
    shortDescription    : string;

    // (1 to many relationship) ...
    // A project can be related to only many descriptions
    @OneToOne(() => Description, Description => Description.project)
    description: Description;

    // (1 to many relationship) ...
    // A project can be related to many industries
    @OneToMany(() => Industry, industry => industry.project)
    industries: Industry[];

    // A project can have many categories
    @OneToMany(() => Category, Category => Category.project)
    categories: Category[];

    // A project could have been created with many technologies
    @OneToMany(() => Technology, Technology => Technology.project)
    technologies: Technology[];

    // A project could have been created with many tools
    @OneToMany(() => Tool, Tool => Tool.project)
    tools: Tool[];

    // A project could have been created with many statuses
    @OneToOne(() => Status, Status => Status.project)
    status: Status;

    @CreateDateColumn()
    createdAt       : Date;

    @UpdateDateColumn()
    lastUpdatedAt   : Date;
}