import {Container, decorate, injectable} from "inversify";
import {BooksRepository} from "./books/BooksRepository";
export const container = new Container();

decorate(injectable(), BooksRepository);
container.bind("BOOKS_REPOSITORY").to(BooksRepository).inSingletonScope();