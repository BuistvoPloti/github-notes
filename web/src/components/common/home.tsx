// @ts-ignore
import React from "react";
import { Emoji } from "./Emoji";

const Home: React.FC = () => {
  return <div className="home__container">
    <h1><Emoji symbol="📂"/> Repository organizer app</h1>
    <p>Created <Emoji symbol="👨🏻‍💻"/> by <a href="https://github.com/BuistvoPloti">Denis Khorovets</a></p>
    <p>Manage repositories<Emoji symbol="📗"/></p>
    <p>Create notes<Emoji symbol="📝"/></p>
    <h2><Emoji symbol="📌"/> Technologies</h2>
    <ul>
      <li><strong>Backend</strong>
        <ul>
          <li><strong>Platform</strong>: Node.js</li>
          <li><strong>Framework</strong>: Express.js</li>
          <li><strong>Db</strong>: Mongodb/Mongoose + Sequelize/Postgresql</li>
          <li><strong>Code based on</strong>: Typescript</li>
          <li><strong>API</strong>: Github API</li>
        </ul>
      </li>
      <li><strong>Frontend</strong>
        <ul>
          <li><strong>Library</strong>: React</li>
          <li><strong>Related technologies</strong>: Redux Toolkit, Sagas</li>
          <li><strong>Code based on</strong>: Typescript</li>
        </ul>
        (meant to be updated soon...)
      </li>
    </ul>
  </div>
};

export { Home };
