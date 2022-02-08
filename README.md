![alt text](https://github.com/woywro/HeyStudent.REACT/blob/master/screenshots/banner.png)

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
- Framer motion
- Firebase (auth + firestore)
- mdx (for blog purposes)
- Context Api

## Problems :confused:

The biggest problem I faced with during coding this app was the problem of querying firebase. Since it doesn't support anything like array-contains-all or anything similar to sql like, there were only few options to sort it out. At first I'd choosen to keep all possible search combinations as array but it was hard to maintain. Eventually all tags are kept as objects where each tag has a boolean value set to true. This allows to use multiple where clauses which are equal to searched words count.

## Live 🧪

Live version will be available soon.
