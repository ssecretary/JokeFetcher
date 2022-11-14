# JokeFetcher
This repo is used to authenticate user and after successful login user will fetch joke.

Steps To use thi repo is as below:

Step 1. Clone this repo in you local machine and run num install to install all packages used in the project.

Step 2. After successfull cloning of the repo download MongoDb and MongoDb compass to connect to local MongoDb and interact with UI using compass.

Step3. After successsful installation of mongodb iinstall postman through which we can test our api.

Step 4. After successfull installation of postman now we can test our api followed by below steps.

Step 5. This repo contains 7 uses api and 1 joke fetching api.

Step 6. First of all register user using given api on local machine : http://localhost:3000/api/users/signup  

                                                                    - method : POST
                                                                    
                                                                    - data : {
                                                                                  "username":"user1",
                                                                                  "password":"user123"
                                                                              }
                                                                              
                                                                    - If user is registered already then it shows user already exists message
                                                                    
Step 7. After successfull signup of user please login using given api : http://localhost:3000/api/users/login

                                                                      - method : POST
                                                                      
                                                                       - data : {
                                                                                    "username":"user1",
                                                                                    "password":"user123"
                                                                                }
                                                                                
                                                                       - If username and password is corrrect is correct user login successfull else throw error
                                                                       
Step 8. After successfull login then only user can able to access other API given below:

        - profile Api : http://localhost:3000/api/users/me
                      - method : GET
                      - This api will display logged in user data only if used login successfullly else throw authenticaton error
                     
        - Random Joke Api : http://localhost:3000/api/random-joke
                          - method : GET
                          - This api is used to get random joke if and only if user login successfully else throw authorization error
                          
        - User Logout Api : http://localhost:3000/api/users/logout
                          - method : POST
                          - data :  - data : {
                                                  "username":"user1",
                                                  "password":"user123"
                                              }
                          - If user is logged in then only user can logout else throw error authorization error
                          
         - get all user api : http://localhost:3000/api/users/get-all-users
                          - method : GET
                          - This appi will get all users only if user is logged in
                          
                          
         - get user from user name : http://localhost:3000/api/users/get-user/{username}
                           - method : GET
                           - This api is used to get user based on username passed in api only if user logged in successfully
                           
 Step 9 : At last to run this app type :  node App.js and press enter (node should be installed in your machine)
                           
 Note : To test all above apis used postman or any ther api testing tool of your choice
         
