
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./Category";
import { Industry } from "./Industry";
import { Technology } from "./Technology";
import { Tool } from "./Tool";
import { Status } from "./Status";
import { Description } from "./Description";
import { Link } from "./Link";
import { Reference } from "./Reference";

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
    pageUrl     : string;

    @Column()
    thumbnail           : string;

    @Column()
    shortDescription    : string;

    // ...
    // A project can be related to many of the following
    @OneToMany(() => Industry, industry => industry.project)
    industries: Industry[];
 
    @OneToMany(() => Category, Category => Category.project)
    categories: Category[];
 
    @OneToMany(() => Technology, Technology => Technology.project)
    technologies: Technology[];
 
    @OneToMany(() => Tool, Tool => Tool.project)
    tools: Tool[];


    // ...
    // A project can be related to only 1 on the following
    @OneToOne(() => Status, Status => Status.project)
    status: Status;

    @OneToOne(() => Description, Description => Description.project)
    description: Description;

    @OneToOne(() => Link, Link => Link.project)
    link: Link;
 
    @OneToOne(() => Reference, Reference => Reference.project)
    reference: Reference;


    // ...
    @CreateDateColumn()
    createdAt       : Date;

    @UpdateDateColumn()
    lastUpdatedAt   : Date;
}