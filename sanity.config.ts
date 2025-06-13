import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { sanityConfig } from './sanity/lib/config'

export default defineConfig({
  name: 'default',
  title: 'RosterLab CMS',
  projectId: sanityConfig.projectId!,
  dataset: sanityConfig.dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  basePath: '/studio',
})