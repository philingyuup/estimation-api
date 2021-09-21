# Microservice Template

    This is the template for the express microservices. Once copied over, please replace the title ('Microservice Template') to the repo name. Afterwards replace the below '[Name of Application]' with the appropriate information. Please delete this section after creating the microservice.

Hi, welcome to the [Name of Application] repo. Please use this readme as an introduction to get you started on working with this repo.

### **Table of Contents**
1. [Get Started](#get-started)
2. [Routes](#Routes)
3. [File Structure](#file-structure)
4. [Error Handling](#error-handling)
5. [Additional Info](#additional-info) 

Additional info can also be found in the Engineering Wiki section of Notion.

---
## **Get Started**

To get started, please follow these instructions:

1. Ensure you have the `.env` file set up (can be found in our local notion). Please place it in the root directory of this repo (same directory-level as this `README.md`)

2. Check the `package.json` and make sure your `PORT` is configured properly. It should read:
```javascript
  // Located in package.json, 'scripts', 'start'
  // for PORT=30##, # can be any integer from 0-9. (i.e. 3004)

  // Windows
  set PORT=30## && react-scripts start

  // Mac & Unix
  PORT=30## react-scripts start
```
You should probably make sure this is the same `PORT` used in the other projects when they need to refer to this repo.

3. Install dependencies using `npm install` or `yarn install`

4. Run with `npm start` or `yarn start`

---

## **Routes**

For information about all the CRUD actions you can perform in this repo, please refer to our [wiki](https://www.notion.so/API-Routes-d4aa969a987f41c0948ee383d4c086b9).

---

## **File Structure**
Here are some of the folders/files we will talk about in this section:
```javascript
  repo
   |--> actions/
   |--> middlewares/
   |--> models/
   |--> routes/
   |--> services/
   |--> .env
```
There are other folders and files found in this repo (such as `src/public/`) that will not be discussed in this chapter (most of them are used for configuration)

### Folders and Files
Here we will go over the general purposes for each of the folder/file (mentioned above).

 1. `actions/`
      ```javascript
        src
        |--> actions/
      ```
      This folder is used to contain all the side-effect actions that occur from a route. It is common to have CRUD requests to other APIs in this folder. 

      Example: After an ecosystem user has updated their estimation, we would want to email an admin about this update. This folder will contain the logic used to send the email.
    
  2. `middleware/`
      ```javascript
        src
        |--> middleware/
      ```
      This folder is used to contain all custom middlewares used in this repo. For middleware initialization from external packages (npm), please initialize in the 'services' folder. 

  3. `models/`
      ```javascript
        src
        |--> models/
      ```
      This folder is used to contain all the Mongoose schema's used throughout this repo. If necessary, sub-directories can be created for organization purposes.

  4. `routes/`
      ```javascript
        src
        |--> routes/
      ```
      This folder contains all routes available from this repo. If necessary, sub-directories can be created for organization purposes. 

      **NOTE**: Before writing a new route, please refer to the [wiki](https://www.notion.so/API-Routes-d4aa969a987f41c0948ee383d4c086b9) and see if there are existing routes that will satisfy your requirements.

  5. `services/`
      ```javascript
        src
        |--> services/
      ```
      This folder contains all external service initialization. (i.e. Firebase-admin, SendGrid)
      
  6. `.env`
     ```javascript
      repo
       |--> .env
     ```
     `.env` is for our sensitive constants, you can find a copy for local usage in our Notion
---

## **Error Handling**

All errors that occurs in a route should return a response with this template. You can extend this template and add additional fields but this is the bare minimum.

```javascript
{
  status: false,
  message // describes why the request failed
}
```

The message should be of type `string` and should be descriptive enough to highlight the problem with the developer's request. The message can also provide hints for the developer on how to fix their request.

As a rule of thumb, there should be error messsages if:
- a request payload is missing required fields
- failed database query
- failed validation check of any data (i.e. non-valid email is provided for a sign-up)

Also remember to `return` your error messages if it is not at the end of a closure. 
```javascript

if (!user) // this will throw an error
  res.json({ status: false, message: 'No user found with the provided credentials. Invalid email/uid' })


if (!user) // this will not throw an error
  return res.json({ status: false, message: 'No user found with the provided credentials. Invalid email/uid' })
```

TODO: Standardize status codes? Do we even need status codes as it's redundant?

---

## **Additional Info**
Here are some helpful links to wikis that cover topics missed in this readme:
- Coding style/best practices [[link]](https://www.notion.so/React-f7fd76fc28da4cac927bc4d5906579ae)
- Authentication/Firebase [[link]](https://www.notion.so/Firebase-Naya-Auth-cb560a33dfd8492e8523dc170bb235eb)
- Testing/QA [[link]](https://www.notion.so/TODO-How-to-QA-f595c4ba6dbb4756a6467f477f3cc27d)

## **Dependencies**
TBD? What rules for dependencies?

