import {Entity, Column, Not, PrimaryColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryColumn()
    email: string;

    @Column({unique:true,nullable:false})
    username: string;

    @Column({type:"text",nullable:true})
    bio?: string;

    @Column({nullable:true})
    image?: string;

}
/*
    "email": "jake@jake.jake",
    "token": "jwt.token.here",
    "username": "jake",
    "bio": "I work at statefarm",
    "image": null
*/