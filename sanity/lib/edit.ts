import { createDataAttribute } from 'next-sanity'
import { dataset, projectId, studioUrl } from './client'

type EditableDocument = {
  _id?: string
  _type?: string
}

export function createSanityEdit(document: EditableDocument | null | undefined, path: string) {
  if (!document?._id || !document?._type || !path) {
    return undefined
  }

  return createDataAttribute({
    baseUrl: studioUrl,
    dataset,
    id: document._id,
    path,
    projectId,
    type: document._type,
  }).toString()
}
