import { authSlice, followSlice, likeSlice, postSlice, userSlice } from '@entities';

const rootInitialState = {
  auth: authSlice.getInitialState(),
  users: userSlice.getInitialState(),
  posts: postSlice.getInitialState(),
  follows: followSlice.getInitialState(),
  likes: likeSlice.getInitialState(),
};

const buildPersistedState = (
  state: typeof rootInitialState,
  inboundPersist?: {
    version: number;
    rehydrated: boolean;
  },
) => ({
  ...state,
  _persist:
    inboundPersist ??
    ({
      version: 1,
      rehydrated: false,
    } as const),
});

const ensureEntityState = <T extends { ids: unknown; entities: unknown }>(
  sliceState: unknown,
  initialState: T,
): T => {
  if (
    !sliceState ||
    typeof sliceState !== 'object' ||
    !Array.isArray((sliceState as { ids: unknown }).ids) ||
    typeof (sliceState as { entities: unknown }).entities !== 'object' ||
    (sliceState as { entities: unknown }).entities === null
  ) {
    return initialState;
  }

  return sliceState as T;
};

export const safeRehydratePersistedState = async (state: unknown) => {
  if (!state || typeof state !== 'object') {
    return buildPersistedState(rootInitialState);
  }

  const typedState = state as {
    auth?: unknown;
    users?: unknown;
    posts?: unknown;
    follows?: unknown;
    likes?: unknown;
    _persist?: {
      version: number;
      rehydrated: boolean;
    };
  };

  try {
    const auth =
      typedState.auth && typeof typedState.auth === 'object' && 'currentUserId' in typedState.auth
        ? (typedState.auth as typeof rootInitialState.auth)
        : rootInitialState.auth;

    const users = ensureEntityState(typedState.users, rootInitialState.users);
    const posts = ensureEntityState(typedState.posts, rootInitialState.posts);
    const follows = ensureEntityState(typedState.follows, rootInitialState.follows);
    const likes = ensureEntityState(typedState.likes, rootInitialState.likes);

    return buildPersistedState(
      {
        auth,
        users,
        posts,
        follows,
        likes,
      },
      typedState._persist,
    );
  } catch {
    return buildPersistedState(rootInitialState);
  }
};
