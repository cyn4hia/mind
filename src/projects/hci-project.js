const hciProject = {
  id: "hci-project",
  name: "Husky Link",
  x: 42,
  y: 40,
  color: "#a8b07d",
  date: "Jan 2026",
  skills: ["Figma", "Hi-fi Prototyping", "Lo-fi prototyping", "Heuristic Evaluation"],
  why: "Northeastern Human-Computer Interaction (CS 2484) semester project",
  steps: [
    { title: "Identify the Problem", description: "Given the semester theme 'Northeastern University students’ loneliness' we were tasked to design an interface that alleviates this issue. Our group chose to specifically target students who were abroad anytime during their college experience. We discovered that many pre-existing solutions like Instagram, Snapchat, school clubs, study groups, all have some sort of flaw that hindered interaction amongst students." },
    
    { title: "Interview Process", description: "I conducted 2 separate interviews on students who did Northeastern's NUin program. Each interview was around 20 minutes long. Some core questions I asked:", questions: [
  "Describe to me your time before coming to the Boston campus (or coming back if co-op).",
  "What did it feel like coming to the Boston campus after being in a different environment for so long?",
  "Do you think upon re-entering campus your social life became better or worse?",
  "Did you find it easy to meet new people or make new friends on campus?",
  "What is different about the social life in Boston compared to what the social life was a semester ago for you?",
  "What was your dining hall experience like? Who were the kinds of people you preferred to eat with? Or did you just prefer to eat alone?",
  "Do you think your social life has had an impact on your mental health? If so, is that in a positive or negative way?",
  "Was it easy to get to know people who might've started their time at Northeastern on a different campus?",
  "Do you think your academic commitments prevent you from socializing more? Do you wish this was not the case?",
  "Do you think there is a way for you to have a healthy balance of socializing with your peers while being productive in your academic work?",
  ], afterText: "I then transcribed each of the interviews and added a summary to what the talk was about. "},
    
  
  { title: "POV Development", content: [ {text: "After analyzing the interviews, our group reviewed our stakeholders and the types of people who might be affected by our interface. I personally did NUin students, Student organizations trying to build global communities, and on-campus staff." }, 
      {quote: "Social and outgoing students who study abroad need casual, low-pressure reassurance, support, and reminders that their extraversion doesn't invalidate their feelings of loneliness because they often feel embarrassed when admitting they are struggling with connection." },
      ]},
    { title: "Task Analysis", description: "We narrowed down the painpoints on our stakeholders and came up with some tasks that help align with the issues that students are experiencing. We came up with the following:" , 
      questions: [ "Talking to a new person in class", "Admit loneliness to a peer", 
        "Schedule time for socializing", 
        "Posting on social media to share moments with friends", 
        "Seek formal mental health support", "Messaging a friend with time-zone differences", 
        "Connecting with a new person online", 
        "Comforting someone who is lonely (through online forum)" ],
        afterText: "We then created a hierarchical task diagram for each task which would later help us develop our lo-fi prototype "},
  
    { title: "Lo-fi Prototyping", content: [{text: "We each created a storyboard which drew from our POV statement. This was the storyboard I drew to showcase what our app would feel like. "},
      {image: "images/hci-storyboard.png"},
      {text: "Afterwards we created a lo-fi prototyped frame based off of our tasks. Here is where we decided on our map idea where the background would be a zoomable map for users to place pins and interact."}, {image: "images/hci-lofiparts.png"}
    ] },

    { title: "Lo-fi Testing", content: [{text: "We had 4 testers who went through the lo-fi prototyping process. One group member acted as the facilitator, reading questions. One group member took notes and observed while another filmed. And I took on the role of acting as the computer, where whenever the user would want to perform an action, I would rearrange the paper pieces like the computer is responding."},
      {image: "images/hci-lofi.png"},
      {text: "After each test we would interview each person and ask for their feedback, many of which had similar suggestions. After compiling all the feedback we then rearranged the paper components to suit the feedback we received."},
      {text: "Our testers were confused with our 'pin/post' button, so we made many adjustments to both the task and the button to make things more clear. We also decided to implement a 'info' button where users can check to see what each button does."}
    ] },
    
    { title: "Hi-fi Prototyping", content: [{text: "Finally, after a lot of review and development we were able to reach the hi-fi prototyping phase where we began to develop our interface on Figma." },
      {images: [
        "images/hci-hifi1.png",
        "images/hci-hifi2.png",
        "images/hci-hifi3.png",
        "images/hci-hifi4.png",
        "images/hci-hifi5.png",
        "images/hci-hifi6.png",
      ]},
      {text: "After a lot of review from testing our prototype in class, we polished up our interface and completed our final round of testing." },
      {image: "images/hci-hifitest.png"},
    ]},
    
    { title: "Final Refinements", content: [{ embed: "https://embed.figma.com/proto/jqUpEPfLAGt5fU3hCFhBsd/HCI-Final-Project?node-id=10-199&starting-point-node-id=10%3A199&embed-host=share" },
      {text: "This is the final product that we submitted along with a slideshow presentation to showcase all the work done this semester."}
    ],},
  ],
  reflection: "I had a really fun time doing this semester long project. It was my first time ever doing something like this so it was definitely a learning experience. Our team met almost every single week from when we were first assigned this project. There were so many other technical developmental aspects that did go into this project as well. I'm really satisfied with this course and I use a lot of the things I learned in my current interface design, like this one!"
  
};

export default hciProject;
