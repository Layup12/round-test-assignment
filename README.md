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

### Основные сценарии

#### Установить зависимости

```bash
pnpm install
```

#### Запуск веба в dev-режиме

```bash
pnpm dev
```

#### Сборка и предпросмотр веба

```bash
pnpm build
pnpm preview
```

#### Запуск Capacitor-сценариев

```bash
pnpm sync         # sync Capacitor-проекта с web-сборкой
pnpm copy         # copy web-сборки в Capacitor-платформы
pnpm open:ios     # открыть iOS-проект в Xcode
pnpm open:android # открыть Android-проект в Android Studio
pnpm run:ios      # запустить iOS-приложение через Capacitor
pnpm run:android  # запустить Android-приложение через Capacitor
```

#### Служебные скрипты

```bash
pnpm lint:fix     # ESLint с автоматическими исправлениями
pnpm format       # форматирование кода (Prettier)
pnpm test         # запуск тестов через Vitest
pnpm test:e2e     # e2e-тесты (Playwright)
```

## Что сделано

- Настроен проект под требования к стеку и код-стилю из ТЗ (TS strict, ESLint + Prettier, лимиты по строкам, lint-staged + husky).
- Реализованы все 4 страницы из ТЗ (авторизация, лента, профиль, списки подписок/подписчиков).
- Реализован механизм лайков.
- Настроен нормализованный Redux state через `createEntityAdapter`.
- Все данные сохраняются в `localStorage` через Redux Persist, при ре-гидрации используется `safeRehydrate` c защитой от невалидного состояния.
- Добавлены роутинг, auth-guard'ы и lazy-loading страниц.
- Для больших списков настроены виртуализация и бесконечная прокрутка (react-virtualized в ленте и списках подписок/подписчиков).
- Добавлены unit и e2e-тесты для сценария авторизации.
- Описан и учтён сценарий запуска внутри WebView/Capacitor (см. раздел Mobile / hybrid-особенности).

## Структура Redux state

Краткая схема сущностей и их связей вынесена в отдельный файл: [`docs/state-shape.md`](docs/state-shape.md).  
State нормализован: сущности хранятся в виде `ids + entities`, связи реализованы через `id`.

## Mobile / hybrid-особенности

- **Брейкпоинты**: max-width для основного layout, сверстано mobile-first, руками проверены `390`, `768`, `1280`.
- **Доступность / touch-first**: интерфейс не опирается на `hover`, основные действия доступны по тачу/клику, интерактивные элементы имеют минимальный размер `44px`, кликабельные и некликабельные элементы отличаются цветом.
- **Safe-area**: используются `env(safe-area-inset-top/bottom)` для шапки и нижних action-панелей.
- **Клавиатура**: layout построен на флекс-контейнерах без жёсткой привязки к высоте viewport; в Capacitor реальное поведение клавиатуры контролируется стандартным плагином.
- **Capacitor / WebView**: добавлены скрипты `sync/copy/run:*` для сборки и запуска контейнера, используются стандартные плагины (`@capacitor/keyboard`, `@capacitor/status-bar`, `@capacitor/splash-screen`).
- **Навигация на Android**: настроена работа стека навигации и системной кнопки Back на Android.

## Что не успел / что оставил как есть

- Не стал ужесточать лимит `max-lines-per-function` до 60 для `*.tsx`: для UI-компонентов оставлен более мягкий порог (100), чтобы не дробить JSX на избыточное число микрокомпонентов.
- Пункт ТЗ «один файл - один экспортируемый интерфейс» показался двусмысленным: я интерпретировал его как «один компонент/хук на файл», не стал агрессивно дробить служебные файлы с несколькими тесно связанными экспортами (RTK-слайсы с state + actions + selectors, barrel-индексы `index.ts` и т.п.), чтобы сохранить читаемость.
- При `pnpm build` есть warning от `react-virtualized` про  
  `"no babel-plugin-flow-react-proptypes"` — это особенность библиотеки, на работу не влияет.
