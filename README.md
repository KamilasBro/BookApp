# Instruction

1. User can interact with title, author and category in each row of the table.
However, when the value is equal to "none" user can't interact with it
2. User can search for books in searching bar.
3. User can use breacrumb as navigation.
4. With all that possibilities, User can dynamicly change the data in the table.
5. The maximum books, that API can give is 40.
6. BookApp in breadcrumb is working as hard reset.
7. For more specific explanation check the comments in the App.js and components

# About the project

The appereance is really simple, It obviously should be better (table resize during fetching, load animation etc...) if that would be commercial project, but for this purpose, it is enough.

I decided to not use the Typescript, the code isn't that long and complicated, most of it is commented and well explained.

The code might suffer from rerendering components, however I don't think there is a great way to avoid it and it is common thing in react.

