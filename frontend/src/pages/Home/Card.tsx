import {Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import React from "react";


interface IProps {
  title: string;
  content: string | JSX.Element;
}

const FlightCard = (props: IProps) => {
  const {
    title,
    content
  } = props;

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        {/*<Button size="small"></Button>*/}
      </CardActions>
    </Card>
  );
}

export default FlightCard;
