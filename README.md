# ROUND Тестовое задание

Мини-соцсеть на React + TypeScript + Redux Toolkit.  
Авторизация по имени, лента постов, профиль, подписки/подписчики, хранение данных в `localStorage`.

## Стек

- React 19 + TypeScript (strict)
- Redux Toolkit + react-redux + redux-persist
- React Router DOM 7
- Mantine 8 + SCSS Modules
- react-virtualized
- Vite 7
- ESLint + Prettier

## Запуск

Требования: Node.js 22+, pnpm 10+.

```bash
pnpm install
pnpm dev
```

Сборка:

```bash
pnpm build
```

Дополнительно:

```bash
pnpm typecheck    # проверка типов TypeScript
pnpm lint         # запуск ESLint
pnpm lint:fix     # ESLint с автоматическими исправлениями
pnpm format       # форматирование кода (Prettier)
pnpm format:check # проверка формата без изменений
pnpm preview      # локальный сервер для собранного билда
```

## Что сделано

- Настроен проект под требования к стеку и код-стилю из ТЗ (TS strict, ESLint + Prettier, лимиты по строкам, lint-staged + husky).
- Реализованы все 4 страницы из ТЗ (авторизация, лента, профиль, списки подписок/подписчиков).
- Настроен нормализованный Redux state через `createEntityAdapter`.
- Все данные сохраняются в `localStorage` через Redux Persist.
- Добавлены роутинг, auth-guard'ы и lazy-loading страниц.
- Для больших списков настроены виртуализация и бесконечная прокрутка (react-virtualized в ленте и списках подписок/подписчиков).

## Что не успел / что оставил как есть

- Не стал ужесточать лимит `max-lines-per-function` до 60 для `*.tsx`: для UI-компонентов оставлен более мягкий порог (100), чтобы не дробить JSX на избыточное число микрокомпонентов.
- Пункт ТЗ «один файл - один экспортируемый интерфейс» показался двусмысленным: я интерпретировал его как «один компонент/хук на файл», не стал агрессивно дробить служебные файлы с несколькими тесно связанными экспортами (RTK-слайсы с state + actions + selectors, barrel-индексы `index.ts` и т.п.), чтобы сохранить читаемость.
- При `pnpm build` есть warning от `react-virtualized` про  
  `"no babel-plugin-flow-react-proptypes"` — это особенность библиотеки, на работу не влияет.
