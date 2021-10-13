# Resume Remix Website
1. Our team created a website which allows the user to create and remix a resume. After logging in through GitHub Authentication, the user is brought to the home page which contains a list of resumes the user has created. The user can create a new resume or update an existing one. In the remixing page, the user can create modules, which are small sections of text representing one part of their resume. They can then add it to a master resume.
Note: When toggling or disabling a module, the module only appears or disappears from the displayed pdf after refreshing the page.

* Here is a link to the project: https://cs4241-group10.herokuapp.com/
* Here is a link to the project in GitHub: https://github.com/mgovilla/final_project

2. All the user needs to do to login is click the Login button on the login page and allow GitHub Authentication.

3. We used React on the client to build our user interface. It allowed us to build components to each manage their own state. We used Typescript in our web application, which allowed us to use static typing, classes, and interfaces. We used Prosemirror, which is a text editor that we used for allowing the user to make modules and then have them show in a master resume.

4. Having a good enough understanding of the technologies we had chosen that we were able to implement into our website was quite the challenge. To start off with, most of us had never used React and none of us had used Typescript before. Using the Prosemirror library was also an obstacle we had to overcome because it was the basis of our website idea. Getting the toggle button to work between the side module menu and the main resume was an example of one of these problems. Even now, it does not work as smoothly as we'd like but given the timeline and the new technologies we worked with, the web application works decently.

5. 
   * Mayank- implemented the Prosemirror editors into the remixing page, implemented GitHub Authentication, worked on router
   * Kyle- created side bar on the remix page for displaying modules, worked on router
   * Evelyn- created top navigation bar, designing and stylizing login and home page
   * Shannen- created functions to retrieve/store data in the database, combine text from multiple Prosemirror editors, and export a resume as a pdf

6. Link to video project: https://youtu.be/AR-HJZPT8pI
