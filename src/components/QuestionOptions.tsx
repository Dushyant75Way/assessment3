import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface QuestionOptionsProps {
  options: string[];
  selectedAnswer: string;
  onSelect: (answer: string) => void;
}

const useStyles = makeStyles({
  radio: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    width: "100%",
  },
});

const QuestionOptions = ({ options, selectedAnswer, onSelect }: QuestionOptionsProps) => {
  const classes = useStyles();
  return (
    <RadioGroup
      value={selectedAnswer}
      onChange={(e) => onSelect(e.target.value)}
      className={classes.radio}
    >
      {options.map((option, index) => (
        <FormControlLabel
          key={index}
          value={option}
          control={<Radio />}
          label={option}
          sx={{
            width: "90%",
            maxWidth: "600px",
            backgroundColor: "#f9f9f9",
            borderRadius: 3,
            padding: "12px 16px",
            border: "1px solid #ddd",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#e3f2fd",
            },
          }}
        />
      ))}
    </RadioGroup>
  );
};

export default QuestionOptions;
