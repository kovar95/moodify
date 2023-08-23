import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import MoodOutlinedIcon from "@mui/icons-material/MoodOutlined";
import MoodBadOutlinedIcon from "@mui/icons-material/MoodBadOutlined";
import SentimentVeryDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentVeryDissatisfiedOutlined";
import SentimentVerySatisfiedOutlinedIcon from "@mui/icons-material/SentimentVerySatisfiedOutlined";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const emotions = [
  {
    face: "happy",
    Icon: <SentimentSatisfiedAltOutlinedIcon />,
  },
  {
    face: "not-happy",
    Icon: <SentimentDissatisfiedOutlinedIcon />,
  },
  {
    face: "full-happy",
    Icon: <MoodOutlinedIcon />,
  },
  {
    face: "sad",
    Icon: <MoodBadOutlinedIcon />,
  },
  {
    face: "bad",
    Icon: <SentimentVeryDissatisfiedOutlinedIcon />,
  },
  {
    face: "sentiment",
    Icon: <SentimentVerySatisfiedOutlinedIcon />,
  },
  {
    face: "new",
    Icon: <AddReactionOutlinedIcon />,
  },
  {
    face: "favourite",
    Icon: <FavoriteBorderIcon />,
  },
];
