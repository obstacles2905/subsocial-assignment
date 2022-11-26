import { Injectable } from "@nestjs/common";
import { customAlphabet } from "nanoid";

@Injectable()
export class AppService {}

export async function generateCustomUid(symbol = '23456789qwertyupasdfghjklzxcvbnm', count = 8) {
    return customAlphabet(symbol.toUpperCase(), count)();
}