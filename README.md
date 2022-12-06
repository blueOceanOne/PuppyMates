<h1 align="center">
  Puppymates
</h1>

<p align="center">
  <img src="https://media.giphy.com/media/YmgaipDjLcMyHjFuGJ/giphy.gif" alt="Puppymates-home-page" />
</p>
  
<h2>
  Description
</h2>
  
<p> Puppymates is an iOS application created with the primary goal of connecting local dogs to one another through a match-based swiping feature.  The project was built from the ground up including collaborating with a client to design wireframes and system architecture.  The application is made up of three primary widgets that enable users to connect with local dogs using a left and right swipe feature, view connection requests and message connections, and arrange events using an Apple maps API. </p>

<h2> Authors: </h2>
<ul>
  <li><a href="https://github.com/samboonzaayer" target="_blank">Sam Boonzaayer<a/></li>
  <li><a href="https://github.com/kallycao" target="_blank">Kally Cao<a/></li>
  <li><a href="https://github.com/KateFeaster" target="_blank">Kate Feaster</a></li>
  <li><a href="https://github.com/boyiq" target="_blank">Boyi Qu</a></li>
  <li><a href="https://github.com/Taylor-Sheets3" target="_blank">Taylor Sheets</a></li>
  <li><a href="https://github.com/hecwon" target="_blank">Hector Wong</a></li>
</ul>

<h2>
  The application
</h2>
<ul>
  <li>
    <h4 >Home page - primary author: <a href="https://github.com/kallycao"     target="_blank">Kally Cao<a/></h4>
    <details>
      <summary>home page details</summary>
    <p>
      The home page allows users to view local dogs within a 50 mile radius. By default, the dog's name, profile photo, and the distance from the user are all displayed.  Additional photos can be viewed using the interface on the right side of the card, and profile details can be viewed by touching the bottom of the card.  Dogs can be filtered by a number of parameters, including size, breed, friendliness, and energy level.
    </p>
    <p align="center">
      <img src="https://media.giphy.com/media/M24bG6vvTtoKeuyCBH/giphy.gif" alt="home-filter" />
    </p>
    <p>
      Users can swipe connect with other dogs by swiping right or left.  A right swipe sends the target dog a match request that can be viewed and accepted in the messages tab.  If both users swipe right on each othat, that bypasses the match request and automatically matches the two dogs.  
    </p>
    <p align="center">
      <img src="https://media.giphy.com/media/1Hxu50XMnGZ216ofk0/giphy.gif" alt="home-swipe" />
    </p>
  </li>
  <li>
    <h4>Messages - primary author: <a href="https://github.com/boyiq" target="_blank">Boyi Qu</a></h4>
    <details>
      <summary>messages page details</summary>
    <p>
      The messages page allows users to interact with dogs they have either connected with, or have pending connections with.  Pending connections are displayed in a carousel at the top of the page that displays the dog's profile picture and name.  Users can click on the dog card to view additional details, as well as accept or reject the match request. 
    </p>
    <p align="center">
      <img src="https://media.giphy.com/media/0FbHbE7Ap9pbt0qjo6/giphy.gif" alt="messages-pending" />
    </p>
    <p>
      The rest of the messages page displays a list of dogs that users have matched with.  Clicking on a dog will open a conversation panel that allows users to send messages to other dogs.  
    </p>
    <p align="center">
      <img src="https://media.giphy.com/media/p66KivC1T2pqvXbkbX/giphy.gif" alt="messages-convesations" />
    </p>
    <p>
      Users also have the option to unmatch with dogs.  Unmatching from another dog will remove that dog from the messages page. The user will be able to view that dog again on the home page and match again at a later time if they so choose.  
    </p>
    <p align="center">
      <img src="https://media.giphy.com/media/XcUKatvoxIBfwnl9AK/giphy.gif" alt="messages-convesations-unmatch" />
    </p>
  </li>
  <li>
    <h4>Events - primary author: <a href="https://github.com/hecwon" target="_blank">Hector Wong</a></h4>
    <details>
      <summary>events page details</summary>
    <p>
      The events page allows users to organize meetings with other dogs using an Apple Maps API.  Users can view the locations of pending events on the interactive map, view event invitations, or add a new event to host.  
    </p>
    <p align="center">
      <img src="https://media.giphy.com/media/e3n5QqBxAV7pEgJwT6/giphy.gif" alt="messages-convesations-unmatch" />
    </p>
    <p>
      By using the "+" button at the bottom of the screen, users can create a new event to host.  The event title, location, description, date, and time will all be displayed to pending invitees in the pending tab.  
    </p>
    <p align="center">
      <img src="https://media.giphy.com/media/m1A6T2jFdkm0jGRMnS/giphy.gif" alt="messages-convesations-unmatch" />
    </p>
    <p>
      Users can also select guests to invite from their list of matched dogs!  Invited dogs will appear on the event invitation.  
    </p>
    <p align="center">
      <img src="https://media.giphy.com/media/0AfuEpp4sUWRwNcn0Y/giphy.gif" alt="messages-convesations-unmatch" />
    </p>
  </li>
</ul>
    
<h2>Technologies:</h2>
<ul>
  <li><img src="https://img.shields.io/badge/Apple Maps-%23000000.svg?style=for-the-badge&logo=apple&logoColor=white" alt="apple maps badge" /></li>
  <li><img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" alt="eslint badge" /></li>
  <li><img src="https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37" alt="expo badge" /></li>
  <li><img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="express badge" /></li>
  <li><img src="https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white" alt="iOS badge" /></li>
  <li><img src="https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white" alt="npm badge" /></li>
  <li><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="node.js badge" /></li>
  <li><img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="postgres badge" /></li>
  <li><img src="https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="react-native badge" /></li>
  <li><img src="https://img.shields.io/badge/Xcode-007ACC?style=for-the-badge&logo=Xcode&logoColor=white" alt="Xcode badge" /></li>
    
    
    
    
    
    
    







