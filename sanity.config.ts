import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './sanity/schemas'
import { sanityConfig } from './sanity/lib/config'

export default defineConfig({
  name: 'default',
  title: 'RosterLab CMS',
  projectId: sanityConfig.projectId!,
  dataset: sanityConfig.dataset,
  plugins: [
    structureTool(), 
    visionTool(),
    presentationTool({
      previewUrl: {
        origin: 'http://localhost:3000',
        draftMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  basePath: '/studio',
})