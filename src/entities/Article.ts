import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import{User} from "./User.js";

@Entity('articles')
export class Article{

    @PrimaryColumn({type:"varchar",length:40})
    slug:string;

    @Column({type:"varchar",length:40})
    title:string;

    @Column({type:"varchar",length:200,nullable:true})
    description?:string;

    @Column({type:"text"})
    body:string;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date; 

    @ManyToOne(type => User)
    user: User;
}

/*
"article": {
    "slug": "how-to-train-your-dragon",
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "It takes a Jacobian",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }
  */