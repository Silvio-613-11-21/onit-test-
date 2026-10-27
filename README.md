## Привет Mr.Яскевич =\)

тема: ToDoList с уклоном в ежедневник и одной классной фитчей <br/>
(других идей у меня для вас нет, да и собственно говоря вы большего не достойны=\))



## Сущности <br/>

- block <br/>
| id | date | title?(optional) | 
    
- task <br/>
| id | blockId(foreign key) | title | description?(optional) |  state(boolean) | noteId?(optional foreign key) |

- subtask <br/>
| id | taskId(foreign key) | title | description?(optional) | state(boolean) |  

- note <br/>
| id | blockId(foreign key) | title | description?(optional) | 



## Запуск <br/>

```
npm install
npm run db:migrate
npm run dev
```

Swagger: `http://${HOST}:${PORT}/api-docs`

## Миграции <br/>

Миграции лежат в `drizzle/`. Каждая миграция — это папка с `migration.sql` (SQL, который создаёт/меняет таблицы)
и `snapshot.json` (состояние схемы на этот момент).

```
npm run db:generate   # после изменения src/database/schema.ts — создать новую миграцию
npm run db:migrate    # применить неприменённые миграции к базе из DATABASE_URL
```

Применить миграции к тестовой базе:

```
DATABASE_URL="postgresql://postgres:admin@localhost:5432/postgre-test" npm run db:migrate
```

## Тесты <br/>

```
npm test              # все тесты
npm run test:unit     # только unit-тесты (база не нужна)
npm run test:integration  # только интеграционные (нужна тестовая база)
```

Тестовая база берётся из `TEST_DATABASE_URL` в `.env`.

Перед прогоном интеграционные тесты пересоздают схему в тестовой базе: удаляют схемы `public` и `drizzle`
и накатывают миграции заново. Поэтому база всегда в чистом состоянии, даже если там остались таблицы
или последовательности от прошлых запусков. Всё, что было в тестовой базе, будет удалено.

Если `TEST_DATABASE_URL` указывает на ту же базу, что и `DATABASE_URL`, тесты не запустятся.

```
tests/
  unit/          # createMdFileContent.test.ts, controllers.test.ts
  integration/   # api.test.ts
  helpers/       # testDb.ts (база, миграции, очистка), http.ts (запуск сервера и запросы)
```

Если тестовая база называется иначе или лежит на другом порту — поправьте `TEST_DATABASE_URL` в `.env`.
