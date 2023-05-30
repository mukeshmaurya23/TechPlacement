const courses = [
  {
    id: 1,
    title: "Node JS for Beginners",
    by: "Peerbits",
    price: "Free",
    timeStamp: "2020-10-10",
    image:
      "https://www.peerbits.com/static/3908ce2a3941a9a56f1b145496600fac/189bc/development-practices-for-node-js-developers-main.jpg",
    description:
      "Node JS is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.",
    lessons: [
      {
        id: 1,
        title: "Welcome to the Node Js course",
        description:
          "As we know, JavaScript is a single-threaded language. This means that only one thing can happen at a time. This is a problem for web servers, because they need to handle many requests at the same time. Node.js solves this problem by creating a model in which JavaScript can perform non-blocking I/O operations, despite being single-threaded. This allows Node.js to handle thousands of concurrent connections with a single server without introducing the burden of managing threads manually.",
        video: "https://www.youtube.com/embed/QFaFIcGhPoM?autoplay=1",
      },
      {
        id: 2,
        title: "How does a Node Js work?",
        description:
          "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.",
        video: "https://www.youtube.com/embed/7fPXI_MnBOY?autoplay=1",
      },
      {
        id: 3,
        title: "What is Express Js?",
        description:
          "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. With a myriad of HTTP utility methods and middleware at your disposal, creating a robust API is quick and easy.",
        video: "https://www.youtube.com/embed/QFaFIcGhPoM?autoplay=1",
      },
    ],
  },
  {
    id: 2,
    title: "Master React JS",
    by: "Max Millian",
    price: "Free",
    timeStamp: "2020-10-10",
    description:
      "React is a JavaScript library for building user interfaces you can check out the docs here. and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications. However, React is only concerned with rendering data to the DOM, and so creating React applications usually requires the use of additional libraries for state management and routing. Redux and React Router are respective examples of such libraries.",
    image: "https://blog.wildix.com/wp-content/uploads/2020/06/react-logo.jpg",
    lessons: [
      {
        id: 1,
        title: "Welcome to the React Js course",
        description:
          "React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications. However, React is only concerned with rendering data to the DOM, and so creating React applications usually requires the use of additional libraries for state management and routing. Redux and React Router are respective examples of such libraries.",
        video: "https://www.youtube.com/embed/QFaFIcGhPoM?autoplay=1",
      },
      {
        id: 2,
        title: "What is JSX?",
        description:
          "JSX is a syntax extension to JavaScript. It is similar to a template language, but it has full power of JavaScript. JSX gets compiled to React.createElement() calls which return plain JavaScript objects called 'React elements'. To get a basic introduction to JSX you can check out the docs here.",
        video: "https://www.youtube.com/embed/7fPXI_MnBOY?autoplay=1",
      },
      {
        id: 3,
        title: "What is a component?",
        description:
          "Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.",
        video: "https://www.youtube.com/embed/QFaFIcGhPoM?autoplay=1",
      },
    ],
  },
  {
    id: 3,
    title: "Advanced Express JS",
    by: "Love Babbar",
    price: "Free",
    timeStamp: "2020-11-20",
    ttl: "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.",
    image: "https://miro.medium.com/max/1400/1*XP-mZOrIqX7OsFInN2ngRQ.png",
    description:
      "Express JS is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.",

    lessons: [
      {
        id: 1,
        title: "Welcome to the Express Js course",
        description:
          "As we know, JavaScript is a single-threaded language. This means that only one thing can happen at a time. This is a problem for web servers, because they need to handle many requests at the same time. Node.js solves this problem by creating a model in which JavaScript can perform non-blocking I/O operations, despite being single-threaded. This allows Node.js to handle thousands of concurrent connections with a single server without introducing the burden of managing threads manually.",
        video: "https://www.youtube.com/embed/QFaFIcGhPoM?autoplay=1",
      },
      {
        id: 2,
        title: "How does a Express Js work?",
        description:
          "Express.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.",
        video: "https://www.youtube.com/embed/QFaFIcGhPoM?autoplay=1",
      },
      {
        id: 3,
        title: "What is Express Js?",
        description:
          "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. With a myriad of HTTP utility methods and middleware at your disposal, creating a robust API is quick and easy.",
        video: "https://www.youtube.com/embed/QFaFIcGhPoM?autoplay=1",
      },
    ],
  },
];

export default courses;
