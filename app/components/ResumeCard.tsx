import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";

const ResumeCard = ({resume: {id, companyName, jobTitle, feedback, imagePath  }}: {resume: Resume}) => {
  return (
    <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
        <div className="resume-card-header">
        <div className="flex flex-col gap-2 flex-1 min-w-0">
            <h2 className="!text-black font-bold break-words text-lg max-sm:text-base leading-tight">
                {companyName}
            </h2>
            <h3 className="text-lg max-sm:text-sm break-words text-gray-500 leading-tight">
                {jobTitle}
            </h3>
        </div>
        <div className="flex-shrink-0">
            <ScoreCircle score={feedback.overallScore} />
         </div>
        </div>
        <div className="gradient-border animate-in fade-in duration-1000 flex-1">
            <div className="w-full h-full">
                <img src={imagePath}
                alt="resume"
                className="w-full h-[350px] max-sm:h-[250px] sm:h-[300px] object-cover object-top rounded-lg"
                />
            </div>
        </div>
    </Link> 
  )
}

export default ResumeCard