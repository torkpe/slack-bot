## How to start application
- npm install (in order to also install dev dependencies to avoid mostly eslint errors and development errors)
- Update .env file with necessary credentials like in example.env
- Set NODE_ENV to production or development in .env file
- `docker-compose up` starts the application on http://localhost:80 if using docker. Otherwise, `npm run dev`

## How to test application
- set NODE_ENV=test in the .env file.
- npm test

## APIS
Considering the nature of the application, only one API is exposed for one's consumption

- [http://seren-env-1.eba-zdvjmien.us-east-2.elasticbeanstalk.com/api/v1/interactions](http://seren-env-1.eba-zdvjmien.us-east-2.elasticbeanstalk.com/api/v1/interactions) 


