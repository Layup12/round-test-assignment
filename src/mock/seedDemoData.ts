import type { FollowEntity, LikeEntity, PostEntity, UserEntity } from '@entities';
import { nanoid } from '@reduxjs/toolkit';

type EntityState<T> = {
  ids: string[];
  entities: Record<string, T>;
};

const createEmptyState = <T>(): EntityState<T> => ({
  ids: [],
  entities: {},
});

const buildDemoUsers = () => {
  const users = createEmptyState<UserEntity>();

  const addUser = (name: string) => {
    const id = nanoid();
    users.ids.push(id);
    users.entities[id] = { id, name };
    return id;
  };

  const aliceId = addUser('Alice');
  const bobbyId = addUser('Bobby');
  const charlieId = addUser('Charlie');
  const dianaId = addUser('Diana');
  const evelynId = addUser('Evelyn');
  const frankId = addUser('Frank');
  const georgeId = addUser('George');
  const harryId = addUser('Harry');
  const isaacId = addUser('Isaac');
  const jackId = addUser('Jack');
  const kyleId = addUser('Kyle');
  const lukeId = addUser('Luke');
  const michaelId = addUser('Michael');
  const nathanId = addUser('Nathan');
  const oliviaId = addUser('Olivia');
  const paulId = addUser('Paul');

  const primaryIds = { aliceId, bobbyId, charlieId, dianaId, evelynId } as const;
  const allUserIds = [
    aliceId,
    bobbyId,
    charlieId,
    dianaId,
    evelynId,
    frankId,
    georgeId,
    harryId,
    isaacId,
    jackId,
    kyleId,
    lukeId,
    michaelId,
    nathanId,
    oliviaId,
    paulId,
  ];

  return {
    users,
    primaryIds,
    allUserIds,
  } as const;
};

const buildDemoPosts = (authorIds: {
  aliceId: string;
  bobbyId: string;
  charlieId: string;
  dianaId: string;
  evelynId: string;
}) => {
  const posts = createEmptyState<PostEntity>();

  const addPost = (authorId: string, text: string) => {
    const id = nanoid();
    posts.ids.push(id);
    posts.entities[id] = {
      id,
      authorId,
      text,
      createdAt: new Date().toISOString(),
    };
    return id;
  };

  const postIds: string[] = [];

  const basePosts: Array<[string, string[]]> = [
    [
      authorIds.aliceId,
      [
        'Привет! Это тестовый пост Alice.',
        'Сегодня проверяю адаптив и лайки.',
        'Ещё один длинный пост, чтобы заполнить ленту.',
      ],
    ],
    [authorIds.bobbyId, ['Пост Bobby про Redux и нормализацию.', 'Пост Bobby про мобильный UX.']],
    [
      authorIds.charlieId,
      ['Charlie пишет о WebView и Capacitor.', 'Charlie любит длинные-тестовые-посты-для-скролла.'],
    ],
    [authorIds.dianaId, ['Diana тестирует профиль и подписки.']],
    [authorIds.evelynId, ['Evelyn — новый пользователь, но уже с постом.']],
  ];

  basePosts.forEach(([author, texts]) => {
    (texts as string[]).forEach((text) => {
      postIds.push(addPost(author as string, text));
    });
  });

  for (let i = 1; i <= 20; i += 1) {
    postIds.push(
      addPost(
        authorIds.aliceId,
        `Дополнительный тестовый пост Alice #${i} для проверки длинной ленты и прокрутки.`,
      ),
    );
  }

  return { posts, postIds } as const;
};

const buildDemoFollows = (
  primaryIds: {
    aliceId: string;
    bobbyId: string;
    charlieId: string;
    dianaId: string;
    evelynId: string;
  },
  allUserIds: string[],
) => {
  const follows = createEmptyState<FollowEntity>();
  const followKeys = new Set<string>();

  const addFollow = (followerId: string, followingId: string) => {
    if (followerId === followingId) {
      return;
    }

    const key = `${followerId}:${followingId}`;
    if (followKeys.has(key)) {
      return;
    }

    followKeys.add(key);

    const id = nanoid();
    follows.ids.push(id);
    follows.entities[id] = {
      id,
      followerId,
      followingId,
    };
  };

  const baseFollows: Array<[string, string]> = [
    [primaryIds.aliceId, primaryIds.bobbyId],
    [primaryIds.aliceId, primaryIds.charlieId],
    [primaryIds.bobbyId, primaryIds.aliceId],
    [primaryIds.bobbyId, primaryIds.dianaId],
    [primaryIds.charlieId, primaryIds.aliceId],
    [primaryIds.charlieId, primaryIds.bobbyId],
    [primaryIds.dianaId, primaryIds.aliceId],
    [primaryIds.evelynId, primaryIds.aliceId],
    [primaryIds.evelynId, primaryIds.bobbyId],
  ];

  baseFollows.forEach(([followerId, followingId]) => addFollow(followerId, followingId));

  allUserIds.forEach((followerId) => {
    if (followerId !== primaryIds.aliceId) {
      addFollow(followerId, primaryIds.aliceId);
    }
  });

  return follows;
};

const buildDemoLikes = (
  primaryIds: {
    aliceId: string;
    bobbyId: string;
    charlieId: string;
    dianaId: string;
    evelynId: string;
  },
  postIds: string[],
) => {
  const likes = createEmptyState<LikeEntity>();
  const likeKeys = new Set<string>();

  const addLike = (userId: string, postId: string) => {
    const key = `${userId}:${postId}`;
    if (likeKeys.has(key)) {
      return;
    }

    likeKeys.add(key);

    const id = nanoid();
    likes.ids.push(id);
    likes.entities[id] = {
      id,
      userId,
      postId,
    };
  };

  const likeTriples: Array<[string, string[]]> = [
    [primaryIds.aliceId, postIds.slice(0, 10)],
    [primaryIds.bobbyId, postIds.slice(5, 15)],
    [primaryIds.charlieId, postIds.slice(2, 12)],
    [primaryIds.dianaId, postIds.slice(8, 18)],
    [primaryIds.evelynId, postIds.slice(10)],
  ];

  likeTriples.forEach(([userId, liked]) => {
    liked.forEach((postId) => addLike(userId, postId));
  });

  return likes;
};

export const buildDemoEntities = () => {
  const { users, primaryIds, allUserIds } = buildDemoUsers();
  const { posts, postIds } = buildDemoPosts(primaryIds);
  const follows = buildDemoFollows(primaryIds, allUserIds);
  const likes = buildDemoLikes(primaryIds, postIds);

  return {
    users,
    posts,
    follows,
    likes,
  } as const;
};
