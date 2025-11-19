# Web Development Final Project - Hook & Eye (Sewing Forum)

Submitted by: Grecia Osorio

This web app: A forum website where hobbyist, beginners and sewing veterans can share patterns, tips, chitchat, and even become mentors.

Time spent: **41** hours spent in total

## Required Features

The following **required** functionality is completed:


- [x] **Web app includes a create form that allows the user to create posts**
  - Form requires users to add a post title
  - Forms should have the *option* for users to add: 
    - additional textual content
    - an image added as an external image URL
- [x] **Web app includes a home feed displaying previously created posts**
  - Web app must include home feed displaying previously created posts
  - By default, each post on the posts feed should show only the post's:
    - creation time
    - title 
    - upvotes count
  - Clicking on a post should direct the user to a new page for the selected post
- [x] **Users can view posts in different ways**
  - Users can sort posts by either:
    -  creation time
    -  upvotes count
  - Users can search for posts by title
- [x] **Users can interact with each post in different ways**
  - The app includes a separate post page for each created post when clicked, where any additional information is shown, including:
    - content
    - image
    - comments
  - Users can leave comments underneath a post on the post page
  - Each post includes an upvote button on the post page. 
    - Each click increases the post's upvotes count by one
    - Users can upvote any post any number of times

- [x] **A post that a user previously created can be edited or deleted from its post pages**
  - After a user creates a new post, they can go back and edit the post
  - A previously created post can be deleted from its post page

The following **optional** features are implemented:


- [x] Web app implements pseudo-authentication
  - Users can only edit and delete posts or delete comments by entering the secret key, which is set by the user during post creation
  - **or** upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them
  - For both options, only the original user author of a post can update or delete it
- [ ] Users can repost a previous post by referencing its post ID. On the post page of the new post
  - Users can repost a previous post by referencing its post ID
  - On the post page of the new post, the referenced post is displayed and linked, creating a thread
- [x] Users can customize the interface
  - e.g., selecting the color scheme or showing the content and image of each post on the home feed
- [x] Users can add more characterics to their posts
  - Users can share and view web videos
  - Users can set flags such as "Question" or "Opinion" while creating a post
  - Users can filter posts by flags on the home feed
  - Users can upload images directly from their local machine as an image file
- [x] Web app displays a loading animation whenever data is being fetched

The following **additional** features are implemented:

* [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of all implemented features:
  <div>
    <a href="https://www.loom.com/share/154d861bde314bd0bcbedad3054eefa9">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/154d861bde314bd0bcbedad3054eefa9-1023f04ce09958c3-full-play.gif#t=0.1">
    </a>
  </div>

Here are the following features not included in previous video: (Upload image from local device, edit own post, and delete own post)
<div>
    <a href="https://www.loom.com/share/81bffe8a7e5744b8824359142e77c252">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/81bffe8a7e5744b8824359142e77c252-141bd0e1d3b24145-full-play.gif#t=0.1">
    </a>
  </div>


GIF created with ...  
[Loom](https://www.loom.com) Chrome extension.


## Notes

In the process of making this website I encounter many complications and challenges. Most specifically what I wanted it to be, for who, and how. I created to be a community forum, which I wanted it to have a patterns section as well as a mentor algorithm. Needless to say, neither of those goals came to fruition, surprising to many but me. I coded for two days straight and still had only the bare bones, this is because I am poor planner. I went head first into the project without realizing the scope of the MVP goals, which were a lot but manageable.

I ended with a satisfying product, which has left me wanting to revisit it as soon as possible. I am very proud of the theme switcher I created. It is a frankenstein's monster of soo many tutorials. I want to come back and add more theme options, even a "choose your own" option!.

## Libraries

1. ⏰ Date-fns - for time display cleanup
2. 🎞️ @lottiefiles/dotlottie-react - for laoding animations
3. 🎨 @material-tailwind/react - for pre-made components using Tailwind CSS

## License

    Copyright [2025] [Grecia Osorio]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
