export default {
  name: 'page',
  type: 'document', // This makes it a document type
  title: 'Page',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'gallery',
      type: 'gallery', // References your gallery schema
      title: 'Gallery',
    },
  ],
}
