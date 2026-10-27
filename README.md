## Привет Mr.Яскевич =\)

тема: ToDoList с уклоном в ежедневник и одной классной фитчей <br/>
(других идей у меня для вас нет, да и собственно говоря вы большего не достойны=\))


Установить зависимости 
```
  npm i 
```

Миграция бд 
```
  drizzle-kit generate
  drizzle-kit migrate
```
или
```
  drizzle-kit push
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



