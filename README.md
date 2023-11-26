# Shoppinglist

Made by Anders, Tobias and Chris


## Application
We have made a singlepage application that resembles a shoppinglist for people who either wants a handy shoppinglist that you can activle interact with or people who might be on a diet and want a way to keep track of what they are eating, the price and how many calories they consume. 

we structured our application with different components such as:

* PersonForm.jsx
* PersonList.jsx
* Signup.jsx
* /middleware/main.js



 all of these components is what goes into App.jsx and what makes this a singlepage application.

 the majority of our logic happens inside of App.jsx with exception to our HandleChange and HandleSubmit functions in PersonForm and our User creation in /middleware/main.js

 we keep the logic centrally in App.jsx and then distribute the needed logic to our different components via. props and destructuring.

 our data for our application is found in /Data/db.json where we can store and collect data from our interaction with the application.

 


## setup
```bash
#Clone the repo
git clone git@github.com:ChriZZZy/Shoppinglist.git

#Navigate to the directory
cd Shoppinglist

#Install dependencies
npm i
#Run react with
npm run dev
#Run Json server with
npm run jsonserver
```



## Technoligies
* VsCode
* NodeJs
* React FrameWork
* JSONserver

## Youtube Video-Link
https://youtu.be/8E97Eb1y6rA
