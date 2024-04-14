import "reflect-metadata";
import {Container} from "inversify";
import {BooksRepository} from "./src/book/BooksRepository";


export const container = new Container();
container.bind(BooksRepository).toSelf();


