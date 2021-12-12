import React from "react";
import { shallow, mount } from "enzyme";
import { NameSearch } from "./components/NameSearch";
import { SearchContextProvider } from "../../context/searchContext";

test("enzyme dive", () => {
  const TestComponent = () => (
    <SearchContextProvider>
      <NameSearch />
    </SearchContextProvider>
  );
  const element = shallow(<TestComponent />);
  element.find("IconButton").simulate("click");
  expect(element).toMatchSnapshot();
});
