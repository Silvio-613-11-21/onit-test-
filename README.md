## Привет Mr.Яскевич =\)

тема: ToDoList с уклоном в ежедневник и одной классной фитчей <br/>
(других идей у меня для вас нет, да и собственно говоря вы большего не достойны=\))


Установить зависимости 
```
  npm i 
```

Миграция бд 
```
  npx drizzle-kit generate
  npx drizzle-kit migrate
```
или
```
  npx drizzle-kit push
```

Запуск
```
  npm run start
```


Перейдите сюда:
[swagger ui](http://127.0.0.1:8080/api-docs)

<!-- ## Сущности <br/>

- block <br/>
| id | date | title?(optional) | 
    
- task <br/>
| id | blockId(foreign key) | title | description?(optional) |  state(boolean) | noteId?(optional foreign key) |

- subtask <br/>
| id | taskId(foreign key) | title | description?(optional) | state(boolean) |  

- note <br/>
| id | blockId(foreign key) | title | description?(optional) |  -->



## Тесты

Все тесты
```
  npm test
```

Только unit-тесты (база не нужна)
```
  npm run test:unit
```

Только интеграционные (нужна база из `TEST_DATABASE_URL`)
```
  npm run test:integration
```

Тесты работают только с базой из `TEST_DATABASE_URL` в `.env`, `DATABASE_URL` они не трогают.
Если тестовой базы нет — тесты создадут её сами, если есть — очистят данные и накатят миграции заново.
Содержимое `TEST_DATABASE_URL` при каждом прогоне удаляется, поэтому там должна быть именно тестовая база.

Как приложение понимает, к какой базе подключаться (`src/database/db.ts`):

```ts
const url = process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL!
    : process.env.DATABASE_URL!;
```

Обычный запуск (`npm start`) берёт `DATABASE_URL`, тесты выставляют `NODE_ENV=test` и приложение
само подключается к `TEST_DATABASE_URL`.
