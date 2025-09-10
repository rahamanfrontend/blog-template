import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
   S.list()
      .title("Blog")
      .items([
         S.documentTypeListItem("blog").title("Posts"),
         S.documentTypeListItem("category").title("Categories"),
         S.documentTypeListItem("author").title("Authors"),
         S.divider(),
         ...S.documentTypeListItems().filter(
            (item) =>
               item.getId() &&
               !["blog", "category", "author"].includes(item.getId()!)
         ),
      ]);
