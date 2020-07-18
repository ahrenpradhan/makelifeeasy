import React from "react";
import Divider from "@material-ui/core/Divider";

import CollapsibleComponent from "./collapse";

class FilterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: [
        {
          name: "Category",
          collapse: false,
          attribute: [null],
        },
        {
          name: "Genre",
          collapse: false,
          attribute: [null],
        },
        {
          name: "Rating",
          collapse: false,
          attribute: [null],
        },
      ],
    };
  }
  handleFilterChange = (filterName, collapse) => {
    this.setState((prevState) => ({
      filter: prevState.filter.map((item) =>
        (item.name === filterName) ? { ...item, collapse } :  { ...item, collapse:false}
      ),
    }));
  };
  render() {
    let { classes } = this.props;
    return (
      <div
        style={{
          width: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {this.state.filter.map((filter) => (
          <div key={filter.name}>
            <CollapsibleComponent
              classes={classes}
              handleFilterChange={this.handleFilterChange}
              filter={filter}
            />
            <Divider />
          </div>
        ))}
      </div>
    );
  }
}

export default FilterComponent;
