# HeyStudent - find your learning path

This project is made to simplify finding your dream field of study. You can find courses by tags, cities and categories 
(e.g. if you search "java gdańsk" you'll see all courses tagged java in Gdańsk). If you are interested in course you can 
observe it, mark that you are interested or see similar courses (matched by category). If you want to know something more about 
choosen course, you can use chat to ask questions. As a logged user you can also add new courses that will be verified by administrator.

## Features :fire:

- searching by tags, categories, cities
- observing up to 10 courses at once
- course chats
- signing on the potential student list
- reporting bugs
- course subjects with descriptions and hours
- required subjects to pass recruitment process
- finding similar courses
- sorting search results (random, alphabetical, popularity)
- signing in with google account
- blog section

## Technology 🔨
- React
- Next JS
- Typescript
- Styled-components
- Formik
- Yup
- Firebase (auth + firestore)
- mdx (for blog purposes)
- Context Api


## Problems :confused:

The biggest problem during coding this app was how to solve the problem of querying firebase. Since firebase doesn't support anything like 'array-contains-all' or multiple querying at once, there were only few options to sort it out. The option I choose was to keep all possible search combinations in tags array in each document. It's not the most elegant solution but until our app grows bigger it will be workng great.


## Live 🧪

Live version will be available soon.

