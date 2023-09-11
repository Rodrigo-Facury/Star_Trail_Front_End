export type User = {
  id: number
  username: string
  firstName: string
  lastName: string
  profilePicturePath: string
  aboutMe?: string
  level: number
  peopleIFollow?: number[]
  exp?: number
}

export type Step = {
  id: number
  description: string
  position: number
  createdAt: string
  updatedAt: string
}

export type Topic = {
  id?: number
  name: string
  trailCount?: number
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
  Topics: Topic[]
  stars: { userId: number }[]
}

export type FeedResponse = {
  trails: Trail[]
  nextPage: number
  totalPages: number
  message: string
}
