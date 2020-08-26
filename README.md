
# Currently used software stack:
- ES6;
- TypeScript;
- Hapi;
- Mongoose;
- MongoDB;
- Mocha, Chai;
- @hapi/lab;


# REST Functionality:
- POST /api/users 
    {
        "name": "name_1",
        "surname": "surname_1",
        "email": "name_1@gmail.com"
    }
- GET /api/users?name=name1&surname=surname1

- POST /api/projects/[user_id]
    {
        "name": "Project_1",
        "body": "bodybodybodybodybodybody",
        "status": "inactive"
    }
- GET /api/projects?name=Project_1&body=bodybodybodybodybodybody&status=active,inactive&user=4f4609b69049633030a5c644,5f4609b69049633030a5c645

- POST /api/tasks/[user_id]
    {
        "name": "Task_1",
        "description": "Description",
        "mark": 5,
        "status": "completed"
    }
- GET /api/tasks?description=Description&mark=3&status=active,completed&name=Task_1&user=4f4609b69049633030a5c644,5f4609b69049633030a5c645

- Aggregate GET /api/tasks/stats


