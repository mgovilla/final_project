## IDEA:

Board shares where you can invite others to review your writing/brainstorm (only you are allowed to edit)

Object Models:
- Board
    - Owner: User
    - Content: string
    - Reviewers: [uuid]

- User
    - Id: uuid
    - Name: string
    - Email: string

- Comment (belongs to Board)
    - Id: uuid
    - Board: BoardId
    - Author: User
    - Content: string

User Flow:
1.  Login to the application with github
2.  Homepage with options to view recent boards or create a new one
    a. recent boards are all ones that you've created sorted by updated_at

On Create New Board
1.  Send post request with initial data for the name/owner of the board
2.  Return edit board page with the data of the new board
3.  During editing, cache the changes and every few seconds, send PATCH to update content

On View Recent Board
1.  Send get request with the id of the board 
2.  If logged in user is the owner: open the edit board page with the data of the requested id
    Else if logged in user is a reviewer: open the review board with the data to make comments
    Else: REFUSE

Tasks:
- Authentication with Github
- Create views for the edit board, comment board, and home pages
    - Test the view renderer first
- Style the Views
- Update and Pull data the mongodb client in Node