# Handy Things

node 20.15.0
angular 18.1


## NX
nx add @nestjs/swagger

### Frontend

install packages
nx add @angular/cdk --project=frontend
npm install ngx-markdown --save

angular specifc
Component
nx g @nx/angular:component my-new-component --directory=frontend/src/app

To generate a new service:
nx g @nx/angular:service store-ser --project=frontend

### Backend

##### Generate a feature (all in one)
 all in one; nx g @nx/nest:feature admin --directory backend/src/app/admin

##### Generate a module
nx g @nx/nest:module users --directory backend/src/app/users
##### Generate a module
 Generate a controller
nx g @nx/nest:controller users --directory backend/src/app/users
##### Generate a module
 Generate a service
nx g @nx/nest:service users --directory backend/src/app/users