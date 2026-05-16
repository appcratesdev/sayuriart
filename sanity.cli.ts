import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9u4sqgld',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  deployment: {
    appId: 'hxi2w3i8qxxfu6883mlvl7c1',
    autoUpdates: true,
  },
})
