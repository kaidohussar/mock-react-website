import type { ContentRoot } from './content/content-types'

// @contentstorage/core is internally used in any framework package
declare module '@contentstorage/core' {
  // Augment the placeholder interface from @contentstorage/core or @contentstorage/react package
  export interface ContentStructure extends ContentRoot {}
  //   ^ 'ContentStructure' This MUST be the exact name
}
