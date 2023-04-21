Demo Accounts:
Username: demo
Password: EE4216

Username: user2
Password: EE4216



Features and Procedure:
1. The login page is located at "localhost/login"
2. The TODO list page is located at "localhost"
3. If the user is not logged in, the user will be redirected from "localhost" back to "localhost/login"
4. A filter that filters between "All", "Complete", and "Pending" TODOs
5. A button that allows users to create new TODOs (A modal will pop up and the user can enter the information)
6. A button that allows users to edit current TODOs
7. A button that allows users to delete current TODOs
8. A label that shows the current mode (Offline if not connected, Connected if Connected)
9. A Pagination function that shows 5 TODOs per page, and navigate between pages
10. When the user disconnects, the changes are stored in localStorage, and the changes will still be reflected
11. When the user regains connection, the changes will be synced into the h2-database
