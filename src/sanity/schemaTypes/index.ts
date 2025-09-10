import { type SchemaTypeDefinition } from "sanity";
import blogType from "./blogType";
import categoryType from "./categoryType";
import authorType from "./authorType";
import tagType from "./tagType";
import instagramType from "./instagramType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogType, categoryType, authorType, tagType, instagramType],
};
