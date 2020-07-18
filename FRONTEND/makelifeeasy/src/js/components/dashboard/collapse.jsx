import React from "react";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";

class Collapsible extends React.Component {
  render() {
    return (
      <div style={{ flex: 1 }}>
        <div
          className="collapse--filterTitle"
          onClick={() =>
            this.props.handleFilterChange(
              this.props.filter.name,
              !this.props.filter.collapse
            )
          }
          style={{
            display: "flex",
            overflow: "hidden",
            justifyContent: "space-between",
            backgroundColor: "rgb(241,241,241)",
            paddingLeft: 16
          }}
        >
          <Typography style={{ lineHeight: "48px" }}>
            {this.props.filter.name}
          </Typography>
          <IconButton
            disableRipple={true}
            disableTouchRipple={true}
            aria-expanded={this.props.filter.collapse}
            aria-label="show more"
            className={this.props.filter.collapse?"filter-expand_closed":"filter-expand_opened"}
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
        <Collapse className="collapse--filterContent" in={this.props.filter.collapse} timeout="auto" unmountOnExit>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don’t open.)
          </Typography>
        </Collapse>
      </div>
    );
  }
}

export default Collapsible;
