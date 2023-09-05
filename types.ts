export type User = {
  id: number
  username: string
  firstName: string
  lastName: string
  profilePicturePath: string
  aboutMe?: string
  level: number
  peopleIFollow?: number[]
}

export type Step = {
  id: number
  description: string
  position: number
  createdAt: string
  updatedAt: string
}

export type Trail = {
  id: number
  title: string
  userId: number
  createdAt: string
  updatedAt: string
  steps: Step[]
  creator: User
  starsCount: number
  Topics: { name: string }[]
  stars: { userId: number }[]
}

export type FeedResponse = {
  trails: Trail[]
  nextPage: number
  totalPages: number
  message: string
}
