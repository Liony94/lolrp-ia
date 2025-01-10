export const POST_RELATIONS = {
  DEFAULT: {
    relations: {
      author: true,
      tags: true
    },
    select: {
      author: {
        id: true,
        username: true
      }
    }
  }
} as const; 