
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./Category";
import { Industry } from "./Industry";
import { Technology } from "./Technology";
import { Tool } from "./Tool";
import { Status } from "./Status";
import { Description } from "./Description";
import { Link } from "./Link";

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
    thumbnail           : string;

    @Column()
    shortDescription    : string;

    // A project can be related to only description (1 to 1 relationship)
    @OneToOne(() => Description, Description => Description.project)
    description: Description;

    // A project can be related to only link (1 to 1 relationship)
    @OneToOne(() => Link, Link => Link.project)
    link: Link;

    // A project can be related to many industries (1 to 1 relationship)
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