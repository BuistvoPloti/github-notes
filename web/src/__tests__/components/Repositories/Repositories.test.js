import React from "react";
import { render, screen } from "@testing-library/react";
import { Repositories } from "../../../components/Repositories/Repositories";
import { BrowserRouter as Router } from 'react-router-dom';

const RepositoriesWrapper = ({ isAuth,githubUser }) => {
  return (
    <Router>
      <Repositories
        repositories={[{}]}
        isAuth={isAuth}
        githubUser={githubUser}
        deleteRequestRepository={jest.fn()}
      />
    </Router>
  )
};

describe("components/Repositories/Repositories", () => {
  test("renders Repositories component with anon user", () => {
    render(<RepositoriesWrapper isAuth={false} githubUser={false}/>);
    screen.getByText("New");
  });
  test("renders Repositories component with auth user", () => {
    render(<RepositoriesWrapper isAuth={true} githubUser={true}/>);
    const createButton = screen.queryByText("New");
    expect(createButton).toBeNull();
  });
});
