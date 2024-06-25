# KnowledgeHut

KnowledgeHut is an educational platform designed to facilitate seamless learning experiences for students and empower instructors to showcase their expertise. Utilizing the MERN stack, KnowledgeHut integrates NextJS and MongoDB to offer a comprehensive suite of features and functionalities.

## Key Features

- **Interactive Learning:** Engage in immersive learning experiences through KnowledgeHut's intuitive user interface.
- **Instructor Showcase:** Provide a platform for instructors to share knowledge and connect with learners worldwide.
- **Course Management:** Easily create, edit, and delete courses to tailor content to specific needs.
- **User Authentication:** Secure user authentication with OTP verification and password recovery functionality.
- **Payment Integration:** Seamlessly handle payments with Razorpay integration for course enrollments.
- **Media Management:** Utilize Cloudinary for efficient storage and management of media content.
- **Markdown Formatting:** Enhance course content readability with Markdown formatting.

**User Interface:**

- **Students:**
  - **Homepage:** Offers a welcoming introduction to the platform, providing quick access to the course list and user profile.
  - **Course List:** Presents an extensive catalog of available courses, complete with detailed descriptions and user ratings.
  - **Wishlist:** Conveniently showcases courses that students have earmarked for future reference.
  - **Cart Checkout:** Streamlines the process for purchasing courses, ensuring a seamless experience.
  - **Course Content:** Delivers comprehensive course materials, including videos and supplementary resources.
  - **User Details:** Displays essential account information, such as name, email, and preferences.
  - **User Edit Details:** Empowers students to customize and manage their account settings.
- **Instructors:**
  - **Dashboard:** Offers instructors an overview of their courses, along with performance metrics and learner feedback.
  - **Insights:** Provides detailed analytics on course engagement, highlighting views, clicks, and other relevant data.
  - **Course Management Pages:** Enables instructors to effortlessly create, update, and remove courses, while also managing content and pricing.
  - **View and Edit Profile Details:** Allows instructors to view and modify their profile information, ensuring accuracy and relevance.
- **Admin (Future Scope):**
  - **Dashboard:** Grants administrators visibility into platform-wide metrics, including course popularity, instructor performance, and user engagement.
  - **Insights:** Furnishes comprehensive insights into key performance indicators, such as user registrations, course enrollments, and revenue generation.
  - **Instructor Management:** Equips admins with tools to oversee instructor accounts, including user details, course listings, and performance evaluations.
  - **Other Relevant Pages:** Provides access to additional administrative functionalities, such as user management and course administration.

**Key Features and Functionalities:**

- **User Authentication and Authorization:** Enables secure access for students and instructors, supporting features like OTP verification and password reset functionality.
- **Course Management:** Empowers instructors to create, manage, and curate courses, while students can explore, enroll, and provide feedback.
- **Payment Integration:** Facilitates seamless transaction processing through Razorpay integration, ensuring hassle-free course enrollment.
- **Cloud-based Media Management:** Harnesses the power of Cloudinary for efficient storage and management of multimedia content.
- **Markdown Formatting:** Optimizes course content for display and rendering on the frontend through Markdown formatting.

**Frameworks, Libraries, and Tools:**

- **NextJS:** Powers the fullstack infrastructure, providing a robust and scalable framework for application development.
- **MongoDB:** Serves as the database of choice, offering flexibility and scalability for data storage needs.
- **JWT (JSON Web Tokens):** Ensures secure authentication and authorization, safeguarding user credentials.
- **Bcrypt:** Enhances security by encrypting and hashing passwords, safeguarding sensitive user data.
- **Mongoose:** Simplifies interaction with MongoDB through an intuitive Object Data Modeling (ODM) library.

**Data Models and Database Schema:**

- **Student Schema:** Includes fields such as name, email, password, and course details for each student.
- **Instructor Schema:** Consists of attributes like name, email, password, and course details for each instructor.
- **Course Schema:** Encompasses course-related information like name, description, instructor details, and media content.

## Contribution Guidelines

Contributions to KnowledgeHut are encouraged! Follow these steps:

1. Fork the repository.
2. Clone your forked repository to your local machine.
3. Create a new branch for your feature (`git checkout -b feat_YourFeatureName`).
4. Implement changes and ensure thorough testing.
5. Commit your changes (`git commit -am "Add your feature"`).
6. Push to the branch (`git push origin feat_YourFeatureName`).
7. Create a new Pull Request to merge your changes into the main branch.

## License

This project is licensed under the [MIT License](LICENSE).
