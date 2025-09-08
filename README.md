# B22CS149

# Reminder

You can check out the work of my endpoints of MICROSERVICE SHORTURL app  in the above root folders in postman_pictures folder

1) Clone repo
  * https://github.com/Vinay1489/B22CS149.git
   *cd Prepare/<your_selected_project>/src


3) Create a .env file in (src) folder for every porject you want to use and provide
MONGO_URI=<your-mongodb-url>-->mongo atlas cluster uri string or compass localhost uri string your wish
JWT_SECRET=<your-secret-key>
PORT=4000

4) Install the dependencies
   Inside the src folder of your selected project please run the following commands in terminal
   npm install
   npm i express mongoose dotenv cors jsonwebtoken  bcrypt  morgan express-rate-limit validator
   npm i -g nodemon

5) After this run the following command inside src folder
   nodemon server.js

Now you are good to go run and check the api endpoints in postman 




