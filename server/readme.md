# API Functionalities

This Node.js application provides various APIs for managing users and contacts in a phonebook. The APIs handle operations like creating users, adding and getting contacts, editing contacts, and searching for contacts based on specific query.

1. User Create
- url:'/user'
- method:'post'
- desc: Creates a new user if the provided email does not exist in the database.
- req body: {"Email":"example@gmail.com"}
- return: Return details of the user.

2. add contact
- url:'/contact/:userid'
- method:'post'
- desc: Adds a contact for the specified user and returns the updated contact     list for that user.
- req params: 'userid'(id of the user)
- req body: {"Name": "Contact Name", "Number": "1234567890" }
- return: Returns the updated list of contacts for the user.

3. get all contact of respective  user
- url:'/contacts/:userid'
- method:'get'
- desc: Getting all contacts of a specific user. Can also perform a search if a query parameter (q) is provided in the URL.
- req params: 'userid'(id of the user)
- query params: 'q' (searc query)
- return: Returns the list of contacts filtered based on the user ID and search query.

4. Update contact
- url:'/contact/:contactid'
- method:'patch'
- desc: Update the respective contact.
- req params: 'contactid'(id of the contact)
- return: Return a message of sucess.


