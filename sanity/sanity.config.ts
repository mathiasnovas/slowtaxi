import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { codeInput } from "@sanity/code-input";
import type { StructureBuilder } from "sanity/structure";
import { schemaTypes } from "./schemas";
import { projectId, dataset } from "./env";

const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("About")
        .child(S.document().schemaType("about").documentId("about")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== "about"
      ),
    ]);

export default defineConfig({
  name: "slowtaxi",
  title: "slow taxi",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure }), codeInput()],
  schema: {
    types: schemaTypes,
  },
});
