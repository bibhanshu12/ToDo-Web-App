# Todo Web App

## Project Status
This project is currently in the **building phase**. User authentication is not yet implemented.

## Overview
This is a simple Todo Web App where users can manage their tasks. Users can add tasks, mark them as complete, and view completed and incomplete tasks separately.

## Folder Structure
```
/todo-web-app
│── /frontend    # Frontend code (React, Vite, etc.)
│── /backend     # Backend code (Node.js, Express, MongoDB, etc.)
│── README.md    # Project documentation
```

## Features
- Add new tasks
- Mark tasks as **Complete**
- View **Incomplete** and **Completed** tasks separately
- Completed tasks move to the **Complete** section

## Tech Stack
### Frontend
- React.js (Vite setup)
- Tailwind CSS (for styling)

### Backend
- Node.js
- Express.js
- MongoDB (for storing tasks)

## How to Run the Project
### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend:
   ```sh
   npm run dev
   ```

## API Endpoints (Planned)
| Method | Endpoint       | Description               |
|--------|--------------|---------------------------|
| GET    | /tasks       | Get all tasks             |
| POST   | /tasks       | Add a new task            |
| PUT    | /tasks/:id   | Mark a task as complete   |
| DELETE | /tasks/:id   | Delete a completed task   |

## Future Improvements
- Implement **User Authentication**
- Improve **UI/UX**
- Add **Task Editing** feature

## Contributions
Contributions are welcome! Feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.

