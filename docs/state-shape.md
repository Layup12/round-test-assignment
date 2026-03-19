# Схема данных и Redux state

## Доменные сущности

```text
User {
  id: string
  name: string
}

Post {
  id: string
  authorId -> User.id
  text: string
  createdAt: ISO string
}

Follow {
  id: string
  followerId -> User.id
  followingId -> User.id
}

Like {
  id: string
  userId -> User.id
  postId -> Post.id
}
```

## Срезы Redux state

```text
auth: {
  currentUserId: string | null
}

users: EntityState<User>   // ids + entities
posts: EntityState<Post>   // ids + entities
follows: EntityState<Follow> // ids + entities
likes: EntityState<Like>   // ids + entities
```

- Состояние сессии (`auth`) хранится отдельно от доменных сущностей и ссылается на пользователя через `currentUserId`.
- Все доменные сущности нормализованы: хранятся в плоском виде (`ids + entities`) и связываются между собой по `id` без дублирования вложенных объектов.
